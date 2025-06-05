import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-comment-panel',
  imports: [CommentsComponent],
  templateUrl: './comment-panel.component.html',
  styleUrl: './comment-panel.component.css'
})

export class CommentPanelComponent {
  @Input() visible = false;
  @Input() articleId!: string;
  @Input() user: any;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}

