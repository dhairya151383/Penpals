import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
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
  @Input() authorId?: string;
  @Input() isFeaturedCarousel: boolean = false; // Input to determine featured vs. regular carousel
  @Input() headerText: string = 'Articles';

  articles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;

  // Define responsive options directly within this component, specific to its purpose
  // Featured carousel usually shows 1 visible article, others can show more.
  currentResponsiveOptions: any[];

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService
  ) {
    // Default responsive options for non-featured carousels
    this.currentResponsiveOptions = [
      { breakpoint: '1199px', numVisible: 3, numScroll: 3 },
      { breakpoint: '991px', numVisible: 2, numScroll: 2 },
      { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];
  }

  ngOnInit(): void {
    this.updateResponsiveOptions();
    this.loadArticles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['authorId'] || changes['isFeaturedCarousel']) {
      this.updateResponsiveOptions(); // Update options if isFeaturedCarousel changes
      this.loadArticles();
    }
  }

  private updateResponsiveOptions(): void {
    if (this.isFeaturedCarousel) {
      this.currentResponsiveOptions = [
        { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
        { breakpoint: '768px', numVisible: 1, numScroll: 1 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 }
      ];
    } else {
      this.currentResponsiveOptions = [
        { breakpoint: '1199px', numVisible: 3, numScroll: 3 },
        { breakpoint: '991px', numVisible: 2, numScroll: 2 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
      ];
    }
  }

  private async loadArticles(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      let fetchedArticles: Article[] = [];
      const allArticles = await this.articleService.getAll();

      // Enrich articles with author names if not already present
      const articlesWithAuthors = await Promise.all(allArticles.map(async article => {
        if (article.authorId && !article.authorName) {
          const author = await this.authorService.getById(article.authorId);
          return { ...article, authorName: author?.name || 'Unknown Author' };
        }
        return article;
      }));

      if (this.isFeaturedCarousel) {
        // Featured article logic: filter by isFeatured and isPublished, then sort by latest date and take top 10
        fetchedArticles = articlesWithAuthors
          .filter(article => article.isFeatured && article.isPublished)
          .sort((a, b) => {
            const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(a.publishDate || 0);
            const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(b.publishDate || 0);
            return dateB.getTime() - dateA.getTime(); // Sort by latest (descending)
          })
          .slice(0, 10); // Take a maximum of 10 articles
      } else if (this.authorId) {
        // Author-specific article logic: filter by authorId and sort by latest date
        fetchedArticles = articlesWithAuthors
          .filter(article => article.authorId === this.authorId && article.isPublished)
          .sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.publishDate || 0);
            const dateB = new Date(b.updatedAt || b.publishDate || 0);
            return dateB.getTime() - dateA.getTime();
          });
      } else {
        // Default (non-featured, non-author specific) article logic: exclude featured and unpublished
        fetchedArticles = articlesWithAuthors
          .filter(article => !article.isFeatured && article.isPublished)
          .sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.publishDate || 0);
            const dateB = new Date(b.updatedAt || b.publishDate || 0);
            return dateB.getTime() - dateA.getTime();
          });
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