import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../../../shared/models/article.model';
import { ArticleDatePipe } from '../../../shared/pipes/article-date.pipe';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ArticleDatePipe],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
})
export class ArticleCardComponent {
  @Input() article!: Article;

}
