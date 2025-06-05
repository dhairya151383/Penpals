import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { Comment } from '../../../shared/models/comment.model';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule,LoadingSpinnerComponent],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  @Input() articleId!: string;
  @Input() user: User | null = null;

  comments: Comment[] = [];
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

  constructor(private commentService: CommentService) {}

  async ngOnInit() {
    this.userId = this.user?.uid ?? '';
    this.userName = this.user?.displayName ?? 'Anonymous';
    this.userAvatarUrl = this.user?.photoURL ?? '';

    await this.loadInitialComments();
    this.loading = false;
  }

  async loadInitialComments() {
    const initial = await this.commentService.loadMoreComments(this.articleId, this.pageSize);
    this.comments = initial;
    this.hasMore = initial.length === this.pageSize;
  }

  async loadMore() {
    const more = await this.commentService.loadMoreComments(this.articleId, this.pageSize);
    this.comments = [...this.comments, ...more];
    this.hasMore = more.length === this.pageSize;
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
      this.comments = this.comments.filter(c => c.id !== commentId && c.parentId !== commentId);
    }
  }

  toggleReplies(commentId: string) {
    this.showReplies[commentId] = !this.showReplies[commentId];
  }

  async postComment() {
    if (this.newComment.trim()) {
      await this.commentService.addComment(this.articleId, this.newComment, this.userId, this.userName, this.userAvatarUrl);
      this.newComment = '';
      await this.loadInitialComments(); // refresh
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

  getReplies(comments: Comment[], parentId: string) {
    return comments.filter(c => c.parentId === parentId);
  }

  timeAgo(timestamp: Timestamp): string {
    const seconds = (Date.now() - timestamp.toMillis()) / 1000;
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
}
