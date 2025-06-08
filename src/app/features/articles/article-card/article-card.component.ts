import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'; // Import SimpleChanges
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
export class ArticleCardComponent implements OnChanges {
  @Input() article!: Article;
  @Input() isFeatured: boolean = false;
  @Input() showTags: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if ('showTags' in changes && changes['showTags'].currentValue === undefined) {
      this.showTags = true;
    }
  }
}
