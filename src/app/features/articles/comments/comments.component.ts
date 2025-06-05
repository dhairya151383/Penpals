import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../shared/models/comment.model';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() articleId!: string;
  // Removed: @Input() user: User | null = null; // No longer needed as an Input

  allComments: Comment[] = [];
  displayedComments: Comment[] = [];
  newComment = '';
  replyingTo: string | null = null;
  replyText: { [key: string]: string } = {};

  userId: string | null = null; // Initialize as null
  userName: string = '';
  userAvatarUrl: string = '';

  showReplies: { [key: string]: boolean } = {};
  editingCommentId: string | null = null;
  editContent = '';
  hasMore = true;
  pageSize = 5;
  loadingAuthAndComments = true; // Renamed for clarity: tracks both auth and initial comment loading

  private realTimeCommentsSubscription: Subscription | undefined;
  private authSubscription: Subscription | undefined;
  private lastVisibleCommentId: string | null = null;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    // Combine authReady$ and user$ to manage loading state and user info
    this.authSubscription = combineLatest([
      this.authService.authReady$.pipe(filter(isReady => isReady)),
      this.authService.user$
    ]).subscribe(([authReady, user]) => {
      if (user) {
        this.userId = user.uid;
        this.userName = user.displayName ?? 'Anonymous';
        this.userAvatarUrl = user.photoURL ?? '';
      } else {
        this.userId = null;
        this.userName = 'Anonymous';
        this.userAvatarUrl = '';
      }
      // If the real-time comments listener hasn't been set up yet, do it now
      if (!this.realTimeCommentsSubscription) {
         this.setupRealTimeCommentsListener();
      }

      // No need to set loadingAuthAndComments = false here, it will be set in loadMore()
      // once comments are fetched.
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
        .pipe(
          map(comments => {
            return comments.sort((a, b) => {
              const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
              const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
              return timeB - timeA;
            });
          })
        )
        .subscribe(
          (fetchedComments: Comment[]) => {
            this.allComments = fetchedComments;
            this.loadMore(true); // Always refresh the displayed comments when new data comes in
            this.loadingAuthAndComments = false; // Hide loading spinner once comments are initially fetched
          },
          (error) => {
            console.error("CommentsComponent: Error fetching real-time comments:", error);
            this.loadingAuthAndComments = false; // Hide loading spinner on error too
          }
        );

        // Initial load of top-level comments for pagination after listener is setup
        // This ensures the first set of paginated comments is loaded.
        // It also sets `loadingAuthAndComments` to false once done.
        this.loadMore();
  }

  async loadMore(refresh: boolean = false) {
    // Do NOT set `loadingAuthAndComments = true;` here if it's a refresh from real-time listener
    // as that would cause the spinner to flash unnecessarily for every real-time update.
    // It's only for the initial load or explicit "Load more" button click.

    try {
      const currentTopLevelComments = this.allComments.filter(comment => comment.parentId === null)
                                    .sort((a, b) => {
                                      const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
                                      const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
                                      return timeB - timeA;
                                    });

      if (refresh) {
        const currentDisplayedCount = this.displayedComments.length;
        this.displayedComments = currentTopLevelComments.slice(0, Math.max(this.pageSize, currentDisplayedCount));

        if (this.displayedComments.length > 0) {
            this.lastVisibleCommentId = this.displayedComments[this.displayedComments.length - 1].id;
        } else {
            this.lastVisibleCommentId = null;
        }

        this.hasMore = currentTopLevelComments.length > this.displayedComments.length;

        // Loading state is managed by the subscriber for initial fetch
        return;
      }

      // Explicit "Load More" button click
      this.loadingAuthAndComments = true; // Show spinner only for explicit load more
      const moreTopLevelComments = await this.commentService.loadMoreComments(this.articleId, this.pageSize, this.lastVisibleCommentId);
      const newUniqueComments = moreTopLevelComments.filter(
        comment => !this.displayedComments.some(dc => dc.id === comment.id)
      );

      this.displayedComments = [...this.displayedComments, ...newUniqueComments]
        .sort((a, b) => {
          const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
          const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

      this.hasMore = moreTopLevelComments.length === this.pageSize;

      if (this.displayedComments.length > 0) {
        this.lastVisibleCommentId = this.displayedComments[this.displayedComments.length - 1].id;
      } else {
        this.lastVisibleCommentId = null;
      }
    } catch (error) {
      console.error('CommentsComponent: Error in loadMore:', error);
    } finally {
      this.loadingAuthAndComments = false; // Hide spinner after explicit load more
    }
  }

  enableEdit(comment: Comment) {
    this.editingCommentId = comment.id;
    this.editContent = comment.content;
  }

  async saveEdit(commentId: string) {
    await this.commentService.editComment(commentId, this.editContent);
    this.editingCommentId = null;
  }

  async deleteComment(commentId: string) {
    if (confirm('Are you sure you want to delete this comment?')) {
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