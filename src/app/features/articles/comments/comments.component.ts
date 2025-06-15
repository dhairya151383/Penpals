import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../shared/models/comment.model';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Subscription, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService, AppUser } from '../../../core/services/auth.service';
import { ArticleService } from '../../../core/services/article.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() articleId!: string;

  allComments: Comment[] = [];
  displayedTopLevelComments: Comment[] = [];
  newComment = '';
  replyingTo: string | null = null;
  replyText: { [key: string]: string } = {};

  userId: string | null = null;
  userName: string = '';
  userAvatarUrl: string = '';
  isAdmin: boolean = false;

  showReplies: { [key: string]: boolean } = {};
  editingCommentId: string | null = null;
  editContent = '';
  hasMore = true;
  pageSize = 5;
  loadingAuthAndComments = true;
  currentSort: 'newest' | 'oldest' | 'mostLiked' = 'newest';

  private realTimeCommentsSubscription: Subscription | undefined;
  private authSubscription: Subscription | undefined;
  private currentDisplayedCount = 0;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  async ngOnInit() {
    this.authSubscription = combineLatest([
      this.authService.authReady$.pipe(filter((isReady) => isReady)),
      this.authService.user$,
    ]).subscribe(
      ([authReady, user]) => {
        if (user) {
          this.userId = user.uid;
          this.userName = user.displayName ?? 'Anonymous';
          this.userAvatarUrl = user.photoURL ?? '';
          this.isAdmin = (user as AppUser).roles?.admin === true;
        } else {
          this.userId = null;
          this.userName = 'Anonymous';
          this.userAvatarUrl = '';
          this.isAdmin = false;
        }

        if (!this.realTimeCommentsSubscription) {
          this.setupRealTimeCommentsListener();
        }
        this.loadingAuthAndComments = false;
      },
      (error) => {
        console.error('CommentsComponent: Auth subscription error:', error);
        this.loadingAuthAndComments = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.realTimeCommentsSubscription) {
      this.realTimeCommentsSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private setupRealTimeCommentsListener() {
    this.realTimeCommentsSubscription = this.commentService
      .getComments(this.articleId)
      .subscribe(
        (fetchedComments: Comment[]) => {
          this.allComments = fetchedComments;
          this.updateDisplayedComments();
        },
        (error) => {
          console.error(
            'CommentsComponent: Error fetching real-time comments:',
            error
          );
        }
      );
  }

  private updateDisplayedComments() {
    let topLevelComments = this.allComments.filter(
      (comment) => comment.parentId === null
    );

    topLevelComments.sort((a, b) => {
      const getTime = (c: Comment) =>
        c.createdAt instanceof Timestamp ? c.createdAt.toMillis() : 0;
      if (this.currentSort === 'newest') return getTime(b) - getTime(a);
      if (this.currentSort === 'oldest') return getTime(a) - getTime(b);
      if (this.currentSort === 'mostLiked') return b.likes - a.likes;
      return 0;
    });

    this.currentDisplayedCount = Math.min(
      this.pageSize,
      topLevelComments.length
    );
    this.displayedTopLevelComments = topLevelComments.slice(
      0,
      this.currentDisplayedCount
    );
    this.hasMore =
      topLevelComments.length > this.displayedTopLevelComments.length;
  }

  async postComment() {
    if (!this.userId || !this.newComment.trim()) return;
    try {
      await this.commentService.addComment(
        this.articleId,
        this.newComment,
        this.userId,
        this.userName,
        this.userAvatarUrl
      );
      this.newComment = '';
      await this.triggerCommentCountWorker();
    } catch (error) {
      console.error('CommentsComponent: Error posting comment:', error);
    }
  }

  async postReply(parentId: string) {
    if (!this.userId) return;
    const content = this.replyText[parentId];
    if (!content?.trim()) return;
    try {
      await this.commentService.addReply(
        this.articleId,
        parentId,
        content,
        this.userId,
        this.userName,
        this.userAvatarUrl
      );
      this.replyText[parentId] = '';
      this.replyingTo = null;
      this.showReplies[parentId] = true;
      await this.triggerCommentCountWorker();
    } catch (error) {
      console.error('CommentsComponent: Error posting reply:', error);
    }
  }

  async deleteComment(commentId: string) {
    const commentToDelete = this.allComments.find((c) => c.id === commentId);
    if (!commentToDelete || !this.canModifyComment(commentToDelete)) return;
    if (
      confirm(
        'Are you sure you want to delete this comment and all its replies?'
      )
    ) {
      try {
        await this.commentService.deleteComment(commentId);
        await this.triggerCommentCountWorker();
      } catch (error) {
        console.error('CommentsComponent: Error deleting comment:', error);
      }
    }
  }

  private async triggerCommentCountWorker() {
    if (typeof Worker === 'undefined') return;

    const comments = await this.commentService.getAllCommentMetadata();

    const worker = new Worker(
      new URL(
        '../../../../app/core/webworker/comment-counter.worker',
        import.meta.url
      ),
      { type: 'module' }
    );

    worker.onmessage = async ({ data }) => {
      const counts = data as Record<string, number>;
      const count = counts[this.articleId] || 0;
      await this.articleService.update(this.articleId, {
        commentsCount: count,
      });
    };

    worker.postMessage(comments);
  }

  sortComments(sortBy: 'newest' | 'oldest' | 'mostLiked') {
    this.currentSort = sortBy;
    this.currentDisplayedCount = this.pageSize;
    this.updateDisplayedComments();
  }

  loadMore() {
    this.currentDisplayedCount += this.pageSize;
    this.updateDisplayedComments();
  }

  canModifyComment(comment: Comment): boolean {
    return this.isAdmin || comment.userId === this.userId;
  }

  enableEdit(comment: Comment) {
    if (this.canModifyComment(comment)) {
      this.editingCommentId = comment.id;
      this.editContent = comment.content;
    }
  }

  async saveEdit(commentId: string) {
    const comment = this.allComments.find((c) => c.id === commentId);
    if (!comment || !this.canModifyComment(comment)) return;
    await this.commentService.editComment(commentId, this.editContent);
    this.editingCommentId = null;
  }

  toggleReplies(commentId: string) {
    this.showReplies[commentId] = !this.showReplies[commentId];
  }

  toggleReply(commentId: string) {
    this.replyingTo = this.replyingTo === commentId ? null : commentId;
  }

  async likeComment(comment: Comment) {
    if (!this.userId) return;
    await this.commentService.toggleLikeComment(comment.id, this.userId);
  }

  hasUserLiked(comment: Comment): boolean {
    return this.userId
      ? comment.likedBy?.includes(this.userId) || false
      : false;
  }

  getReplies(parentId: string) {
    return this.allComments
      .filter((c) => c.parentId === parentId)
      .sort((a, b) => {
        const timeA =
          a.createdAt instanceof Timestamp ? a.createdAt.toMillis() : 0;
        const timeB =
          b.createdAt instanceof Timestamp ? b.createdAt.toMillis() : 0;
        return timeA - timeB;
      });
  }

  timeAgo(timestamp: Timestamp): string {
    if (!timestamp || !(timestamp instanceof Timestamp)) return 'Invalid date';
    const seconds = (Date.now() - timestamp.toMillis()) / 1000;
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
}
