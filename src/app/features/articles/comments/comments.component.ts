import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../shared/models/comment.model';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Subscription } from 'rxjs';

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

  allComments: Comment[] = []; // Store all comments fetched
  comments: Comment[] = []; // Only top-level comments for the main display
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

  private commentsSubscription: Subscription | undefined;

  constructor(private commentService: CommentService) {}

  async ngOnInit() {
    this.userId = this.user?.uid ?? '';
    this.userName = this.user?.displayName ?? 'Anonymous';
    this.userAvatarUrl = this.user?.photoURL ?? '';

    this.commentsSubscription = this.commentService.getComments(this.articleId).subscribe(
      (fetchedComments: Comment[]) => {
        this.allComments = fetchedComments; // Store all comments
        this.comments = this.allComments
          .filter(comment => !comment.parentId) // Filter for top-level comments
          .sort((a, b) => (b.createdAt as Timestamp).toMillis() - (a.createdAt as Timestamp).toMillis()); // Sort top-level comments
        this.loading = false;
      },
      (error) => {
        console.error("Error fetching comments:", error);
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }

  async loadMore() {
    // This loadMore would now be for paginating the initial set of top-level comments
    // if you choose to implement that on top of the real-time listener.
    // For a simple real-time display of all comments (including replies nested),
    // you might not need this unless your comment list is extremely long and you want to initially
    // load only a subset of top-level comments.
    // If you keep it, ensure `loadMoreComments` in the service fetches only top-level comments as it does now.
    // The `comments` array would then be populated by `loadMore` calls and the real-time listener would manage updates.
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
      await this.commentService.deleteComment(commentId);
    }
  }

  toggleReplies(commentId: string) {
    this.showReplies[commentId] = !this.showReplies[commentId];
  }

  async postComment() {
    if (this.newComment.trim()) {
      await this.commentService.addComment(this.articleId, this.newComment, this.userId, this.userName, this.userAvatarUrl);
      this.newComment = '';
    }
  }

  async postReply(parentId: string) {
    const content = this.replyText[parentId];
    if (content?.trim()) {
      await this.commentService.addReply(this.articleId, parentId, content, this.userId, this.userName, this.userAvatarUrl);
      this.replyText[parentId] = '';
      this.replyingTo = null;
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
           .sort((a, b) => (a.createdAt as Timestamp).toMillis() - (b.createdAt as Timestamp).toMillis()); // Sort replies by oldest first
  }

  timeAgo(timestamp: Timestamp): string {
    const seconds = (Date.now() - timestamp.toMillis()) / 1000;
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
}