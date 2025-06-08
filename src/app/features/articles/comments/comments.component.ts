// src/app/features/articles/comments/comments.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../shared/models/comment.model';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth'; // Keep User for Firebase original type
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService, AppUser } from '../../../core/services/auth.service'; // Import AppUser

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() articleId!: string;

  allComments: Comment[] = []; // Stores ALL comments from the real-time listener (top-level and replies)
  displayedTopLevelComments: Comment[] = []; // Stores only top-level comments for current view (filtered, sorted, paginated)
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
  currentSort: 'newest' | 'oldest' | 'mostLiked' = 'newest'; // Default sort

  private realTimeCommentsSubscription: Subscription | undefined;
  private authSubscription: Subscription | undefined;
  private currentDisplayedCount = 0; // Tracks how many top-level comments are currently shown

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
      this.loadingAuthAndComments = false; // Auth is ready, comments can now attempt to load
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
          this.updateDisplayedComments(); // Update the view based on all comments
        },
        (error) => {
          console.error("CommentsComponent: Error fetching real-time comments:", error);
        }
      );
  }

  private updateDisplayedComments() {
    // 1. Filter for top-level comments
    let topLevelComments = this.allComments.filter(comment => comment.parentId === null);

    // 2. Sort them based on current sort order
    topLevelComments.sort((a, b) => {
      if (this.currentSort === 'newest') {
        const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
        const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
        return timeB - timeA; // Newest first
      } else if (this.currentSort === 'oldest') {
        const timeA = (a.createdAt instanceof Timestamp) ? a.createdAt.toMillis() : 0;
        const timeB = (b.createdAt instanceof Timestamp) ? b.createdAt.toMillis() : 0;
        return timeA - timeB; // Oldest first
      } else if (this.currentSort === 'mostLiked') {
        return b.likes - a.likes; // Most liked first
      }
      return 0;
    });

    // 3. Apply client-side pagination
    // Initialize currentDisplayedCount if it's the first load or after a sort change
    if (this.currentDisplayedCount === 0 || this.currentDisplayedCount < this.pageSize) {
      this.currentDisplayedCount = this.pageSize;
    }
    // If comments are deleted, ensure currentDisplayedCount doesn't exceed total top-level comments
    if (this.currentDisplayedCount > topLevelComments.length) {
      this.currentDisplayedCount = topLevelComments.length;
    }


    this.displayedTopLevelComments = topLevelComments.slice(0, this.currentDisplayedCount);
    this.hasMore = topLevelComments.length > this.displayedTopLevelComments.length;
  }

  loadMore() {
    this.currentDisplayedCount += this.pageSize;
    this.updateDisplayedComments(); // Re-calculate based on increased count
  }

  sortComments(sortBy: 'newest' | 'oldest' | 'mostLiked') {
    this.currentSort = sortBy;
    this.currentDisplayedCount = this.pageSize; // Reset display count for new sort
    this.updateDisplayedComments(); // Re-calculate and display
  }

  // Helper function to determine if a comment can be edited/deleted
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
    // Real-time listener will update displayed comments
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
        // Real-time listener will update displayed comments
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
        // Real-time listener will trigger updateDisplayedComments
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
        this.showReplies[parentId] = true; // Automatically open replies after posting
        // Real-time listener will trigger updateDisplayedComments
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
    // Real-time listener will update the likes
  }

  hasUserLiked(comment: Comment): boolean {
    return this.userId ? (comment.likedBy?.includes(this.userId) || false) : false;
  }

  getReplies(parentId: string) {
    // Replies are always sorted oldest first, directly from allComments
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
    return `${Math.floor(seconds / 86400)}d ago`; // Corrected 'd ago'
  }
}