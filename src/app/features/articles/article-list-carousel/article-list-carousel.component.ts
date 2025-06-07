import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../shared/models/article.model';
import { ArticleCardComponent } from '../article-card/article-card.component';

@Component({
  selector: 'app-article-list-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, ArticleCardComponent],
  templateUrl: './article-list-carousel.component.html',
  styleUrls: ['./article-list-carousel.component.css']
})
export class ArticleListCarouselComponent implements OnInit, OnChanges {
  @Input() authorName: string | undefined;
  @Input() isFeaturedCard: boolean = false;
  @Input() headerText: string = 'Articles';

  articles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;

  responsiveOptions: any[] = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authorName']) {
      this.loadArticles();
    }
  }

  private async loadArticles(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      let fetchedArticles: Article[] = [];
      if (this.authorName) {
        const allArticles = await this.articleService.getAll();
        fetchedArticles = allArticles.filter(article =>
          article.authorName?.toLowerCase() === this.authorName?.toLowerCase()
        );

      } else {
        fetchedArticles = await this.articleService.getAll();
      }
      this.articles = fetchedArticles;
    } catch (err) {
      console.error('Failed to load articles:', err);
      this.error = 'Failed to load articles. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
}