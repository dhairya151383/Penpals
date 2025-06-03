import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../../../../shared/models/article.model';
import { Timestamp } from 'firebase/firestore'; // or 'firebase/firestore-lite' depending on your setup

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
})
export class ArticleCardComponent implements OnChanges {
  @Input() article!: Article;
  formattedPublishDate?: Date;

  ngOnChanges(): void {
    const rawDate = this.article.publishDate;
    if (rawDate instanceof Date) {
      this.formattedPublishDate = rawDate;
    } else if ((rawDate as any)?.toDate) {
      this.formattedPublishDate = (rawDate as any).toDate();
    } else if (typeof rawDate === 'string') {
      this.formattedPublishDate = new Date(rawDate);
    }
  }
}
