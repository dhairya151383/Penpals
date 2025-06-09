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
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.authSubscription = combineLatest([
      this.authService.authReady$.pipe(filter(isReady => isReady)),
      this.authService.user$
    ]).subscribe(([authReady, user]) => {
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
    }, (error) => {
      console.error("CommentsComponent: Auth subscription error:", error);
      this.loadingAuthAndComments = false;
    });
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
    this.realTimeCommentsSubscription = this.commentService.getComments(this.articleId)
      .subscribe(
        (fetchedComments: Comment[]) => {
          this.allComments = fetchedComments;
          this.updateDisplayedComments();
        },
        (error) => {
          console.error("CommentsComponent: Error fetching real-time comments:", error);
        }
      );
  }

  private updateDisplayedComments() {
    let topLevelComments = this.allComments.filter(comment => comment.parentId === null);

    topLevelComments.sort((a, b) => {
      if (this.currentSort === 'newest') {
        const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
        const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      } else if (this.currentSort === 'oldest') {
        const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
        const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
        return timeA - timeB;
      } else if (this.currentSort === 'mostLiked') {
        return b.likes - a.likes;
      }
      return 0;
    });

    if (this.currentDisplayedCount === 0 || this.currentDisplayedCount < this.pageSize) {
      this.currentDisplayedCount = this.pageSize;
    }
    if (this.currentDisplayedCount > topLevelComments.length) {
      this.currentDisplayedCount = topLevelComments.length;
    }

    this.displayedTopLevelComments = topLevelComments.slice(0, this.currentDisplayedCount);
    this.hasMore = topLevelComments.length > this.displayedTopLevelComments.length;
  }

  loadMore() {
    this.currentDisplayedCount += this.pageSize;
    this.updateDisplayedComments();
  }

  sortComments(sortBy: 'newest' | 'oldest' | 'mostLiked') {
    this.currentSort = sortBy;
    this.currentDisplayedCount = this.pageSize;
    this.updateDisplayedComments();
  }

  canModifyComment(comment: Comment): boolean {
    return this.isAdmin || comment.userId === this.userId;
  }

  enableEdit(comment: Comment) {
    if (this.canModifyComment(comment)) {
      this.editingCommentId = comment.id;
      this.editContent = comment.content;
    } else {
      console.warn('User not authorized to edit this comment.');
    }
  }

  async saveEdit(commentId: string) {
    const commentToEdit = this.allComments.find(c => c.id === commentId);
    if (!commentToEdit || !this.canModifyComment(commentToEdit)) {
      console.error('CommentsComponent: Unauthorized attempt to save edit or comment not found.');
      return;
    }
    await this.commentService.editComment(commentId, this.editContent);
    this.editingCommentId = null;
  }

  async deleteComment(commentId: string) {
    const commentToDelete = this.allComments.find(c => c.id === commentId);
    if (!commentToDelete || !this.canModifyComment(commentToDelete)) {
      console.error('CommentsComponent: Unauthorized attempt to delete comment or comment not found.');
      return;
    }

    if (confirm('Are you sure you want to delete this comment and all its replies?')) {
      try {
        await this.commentService.deleteComment(commentId);
      } catch (error) {
        console.error('CommentsComponent: Error deleting comment:', error);
      }
    }
  }

  toggleReplies(commentId: string) {
    this.showReplies[commentId] = !this.showReplies[commentId];
  }

  async postComment() {
    if (!this.userId) {
      console.warn('CommentsComponent: User not logged in to post comments.');
      return;
    }
    if (this.newComment.trim()) {
      try {
        await this.commentService.addComment(this.articleId, this.newComment, this.userId, this.userName, this.userAvatarUrl);
        this.newComment = '';
      } catch (error) {
        console.error('CommentsComponent: Error posting comment:', error);
      }
    }
  }

  async postReply(parentId: string) {
    if (!this.userId) {
      console.warn('CommentsComponent: User not logged in to post replies.');
      return;
    }
    const content = this.replyText[parentId];
    if (content?.trim()) {
      try {
        await this.commentService.addReply(this.articleId, parentId, content, this.userId, this.userName, this.userAvatarUrl);
        this.replyText[parentId] = '';
        this.replyingTo = null;
        this.showReplies[parentId] = true;
      } catch (error) {
        console.error('CommentsComponent: Error posting reply:', error);
      }
    }
  }

  toggleReply(commentId: string) {
    this.replyingTo = this.replyingTo === commentId ? null : commentId;
  }

  async likeComment(comment: Comment) {
    if (!this.userId) {
      console.warn('CommentsComponent: User not logged in to like comments.');
      return;
    }
    await this.commentService.toggleLikeComment(comment.id, this.userId);
  }

  hasUserLiked(comment: Comment): boolean {
    return this.userId ? (comment.likedBy?.includes(this.userId) || false) : false;
  }

  getReplies(parentId: string) {
    return this.allComments.filter(c => c.parentId === parentId)
      .sort((a, b) => {
        const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
        const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
        return timeA - timeB;
      });
  }

  timeAgo(timestamp: Timestamp): string {
    if (!timestamp || !(timestamp instanceof Timestamp)) {
      return 'Invalid date';
    }
    const seconds = (Date.now() - timestamp.toMillis()) / 1000;
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
}