import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../shared/models/comment.model';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() articleId!: string;
  @Input() user: User | null = null;

  allComments: Comment[] = [];
  displayedComments: Comment[] = [];
  newComment = '';
  replyingTo: string | null = null;
  replyText: { [key: string]: string } = {};

  userId = '';
  userName = '';
  userAvatarUrl = '';

  showReplies: { [key: string]: boolean } = {};
  editingCommentId: string | null = null;
  editContent = '';
  hasMore = true;
  pageSize = 5;
  loading = true;

  private realTimeCommentsSubscription: Subscription | undefined;
  private lastVisibleCommentId: string | null = null;

  constructor(private commentService: CommentService) { }

  async ngOnInit() {
    console.log('CommentsComponent: ngOnInit started');
    console.log('CommentsComponent: articleId received:', this.articleId);
    console.log('CommentsComponent: user received:', this.user);

    this.userId = this.user?.uid ?? '';
    this.userName = this.user?.displayName ?? 'Anonymous';
    this.userAvatarUrl = this.user?.photoURL ?? '';

    console.log('CommentsComponent: User Info:', { userId: this.userId, userName: this.userName, userAvatarUrl: this.userAvatarUrl });

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
          console.log('CommentsComponent: Real-time listener: fetchedComments (all comments) received:', fetchedComments.length);
          this.allComments = fetchedComments;
          // IMPORTANT: Re-trigger loadMore to refresh the paginated view.
          // This ensures newly added top-level comments are reflected in the paginated list,
          // and deleted comments are removed.
          // We don't call updateDisplayedComments directly here anymore to avoid breaking pagination logic.
          this.loadMore(true); // Pass true to indicate a refresh, keeping current loaded count
        },
        (error) => {
          console.error("CommentsComponent: Error fetching real-time comments:", error);
        }
      );

    // Initial load of top-level comments for pagination
    await this.loadMore();
    console.log('CommentsComponent: ngOnInit finished');
  }

  ngOnDestroy(): void {
    if (this.realTimeCommentsSubscription) {
      this.realTimeCommentsSubscription.unsubscribe();
      console.log('CommentsComponent: realTimeCommentsSubscription unsubscribed');
    }
  }

  // Removed updateDisplayedComments as its logic will be mostly absorbed by loadMore
  // or a more direct approach with allComments and getReplies.
  // We want loadMore to be the single source of truth for `displayedComments`.
  private updateDisplayedComments() {
    // This method is no longer directly manipulating `displayedComments` based on `allComments` slice.
    // Instead, `loadMore` will be responsible for fetching and updating `displayedComments`.
    // We can use this method to re-evaluate `hasMore` or simply rely on `loadMore(true)` to refresh.

    // Let's keep it simple for now, relying on `loadMore(true)` after real-time updates.
    // If you need more granular control over `displayedComments` without refetching,
    // this method would need a more complex strategy (e.g., adding only new top-level
    // comments *before* the current `lastVisibleCommentId`).
    console.log('CommentsComponent: updateDisplayedComments: (not actively used for pagination anymore)');
  }


  async loadMore(refresh: boolean = false) {
    console.log('CommentsComponent: loadMore started. Refresh:', refresh);
    this.loading = true;

    try {
      let currentTopLevelComments = this.allComments.filter(comment => comment.parentId === null)
                                    .sort((a, b) => {
                                      const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
                                      const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
                                      return timeB - timeA; // Latest first
                                    });

      let commentsToFetch = this.pageSize;
      let startAfterId: string | null = this.lastVisibleCommentId;

      if (refresh) {
        // If it's a refresh, we want to re-evaluate the displayed comments based on
        // the *current* `allComments` and the total number of comments currently displayed.
        // This ensures deleted comments are removed and new comments at the top are visible.
        commentsToFetch = Math.max(this.pageSize, this.displayedComments.length);
        startAfterId = null; // We might need to re-fetch from the beginning to ensure correct order/removal
                              // Or, simply reconstruct displayedComments from `currentTopLevelComments`
                              // based on the total count we want to maintain.

        // Reconstruct displayedComments from the sorted `currentTopLevelComments`
        // taking as many as were previously displayed, or `pageSize` if it's the initial load.
        this.displayedComments = currentTopLevelComments.slice(0, commentsToFetch);

        // Update lastVisibleCommentId based on the *newly reconstructed* displayedComments
        if (this.displayedComments.length > 0) {
            this.lastVisibleCommentId = this.displayedComments[this.displayedComments.length - 1].id;
        } else {
            this.lastVisibleCommentId = null;
        }

        // Determine if there are more comments than currently displayed
        this.hasMore = currentTopLevelComments.length > this.displayedComments.length;

        console.log('CommentsComponent: loadMore (refresh): displayedComments updated:', this.displayedComments.length);
        console.log('CommentsComponent: loadMore (refresh): hasMore set to:', this.hasMore);
        this.loading = false;
        return; // Exit as we've updated from in-memory `allComments`
      }

      // If not a refresh, proceed with actual Firestore pagination
      const moreTopLevelComments = await this.commentService.loadMoreComments(this.articleId, commentsToFetch, startAfterId);
      console.log('CommentService: loadMoreComments: Fetched', moreTopLevelComments.length, 'top-level comments from Firestore.');

      // Filter out duplicates (though with proper startAfter, this should be minimal)
      const newUniqueComments = moreTopLevelComments.filter(
        comment => !this.displayedComments.some(dc => dc.id === comment.id)
      );

      this.displayedComments = [...this.displayedComments, ...newUniqueComments]
        .sort((a, b) => { // Re-sort after merging to maintain order
          const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
          const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
          return timeB - timeA; // Descending order (latest first)
        });

      this.hasMore = moreTopLevelComments.length === this.pageSize; // If fetched less than pageSize, no more to load

      if (this.displayedComments.length > 0) {
        this.lastVisibleCommentId = this.displayedComments[this.displayedComments.length - 1].id;
      } else {
        this.lastVisibleCommentId = null;
      }

      console.log('CommentsComponent: loadMore: displayedComments array updated:', this.displayedComments.length);
      console.log('CommentsComponent: loadMore: hasMore set to:', this.hasMore);
    } catch (error) {
      console.error('CommentsComponent: Error in loadMore:', error);
    } finally {
      this.loading = false;
      console.log('CommentsComponent: loadMore finished. Loading set to:', this.loading);
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
      console.log('CommentsComponent: Deleting comment:', commentId);
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
    if (this.newComment.trim()) {
      console.log('CommentsComponent: Posting new comment...');
      try {
        await this.commentService.addComment(this.articleId, this.newComment, this.userId, this.userName, this.userAvatarUrl);
        this.newComment = '';
        console.log('CommentsComponent: Comment posted successfully.');
      } catch (error) {
        console.error('CommentsComponent: Error posting comment:', error);
      }
    }
  }

  async postReply(parentId: string) {
    const content = this.replyText[parentId];
    if (content?.trim()) {
      console.log('CommentsComponent: Posting reply...');
      try {
        await this.commentService.addReply(this.articleId, parentId, content, this.userId, this.userName, this.userAvatarUrl);
        this.replyText[parentId] = '';
        this.replyingTo = null;
        this.showReplies[parentId] = true;
        console.log('CommentsComponent: Reply posted successfully.');
      } catch (error) {
        console.error('CommentsComponent: Error posting reply:', error);
      }
    }
  }
  toggleReply(commentId: string) {
    this.replyingTo = this.replyingTo === commentId ? null : commentId;
  }
  likeComment(commentId: string) {
    this.commentService.likeComment(commentId);
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