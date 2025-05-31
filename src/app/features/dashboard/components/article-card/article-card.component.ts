import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../../../../shared/models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article class="card">
      <img
        *ngIf="article.thumbnailUrl"
        [src]="article.thumbnailUrl"
        [alt]="article.title"
        class="thumbnail"
      />
      <div class="content">
        <h2><a [routerLink]="['/articles', article.id]">{{ article.title }}</a></h2>
        <p class="brief">{{ article.briefDescription }}</p>
        <p class="meta">
          By {{ article.authorName }} | {{ article.publishDate | date: 'mediumDate' }}
          <span *ngIf="article.isFeatured" class="featured">★ Featured</span>
        </p>
      </div>
    </article>
  `,
  styles: [
    `
      .card {
        border: 1px solid #ddd;
        border-radius: 6px;
        overflow: hidden;
        display: flex;
        margin-bottom: 1rem;
        box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
      }
      .thumbnail {
        width: 120px;
        height: 100%;
        object-fit: cover;
      }
      .content {
        padding: 0.75rem 1rem;
        flex-grow: 1;
      }
      .brief {
        color: #555;
        margin: 0.5rem 0;
      }
      .meta {
        font-size: 0.875rem;
        color: #888;
      }
      .featured {
        color: gold;
        font-weight: bold;
        margin-left: 1rem;
      }
    `,
  ],
})
export class ArticleCardComponent {
  @Input() article!: Article;
}
