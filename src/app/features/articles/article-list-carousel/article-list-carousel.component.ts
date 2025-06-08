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
  @Input() isFeaturedCarousel: boolean = false;
  @Input() headerText: string = 'Articles';
  @Input() currentArticleTags: string[] = [];
  @Input() currentArticleAuthorId?: string;
  @Input() currentArticleId?: string;
  @Input() cardsToShow: number = 3;
  @Input() showCardTags: boolean = true;

  articles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;
  currentResponsiveOptions: any[];

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService
  ) {
    this.currentResponsiveOptions = [];
  }

  ngOnInit(): void {
    this.updateResponsiveOptions();
    this.loadArticles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['authorId'] ||
      changes['isFeaturedCarousel'] ||
      changes['currentArticleTags'] ||
      changes['currentArticleAuthorId'] ||
      changes['currentArticleId'] ||
      changes['cardsToShow'] ||
      changes['showCardTags']
    ) {
      this.updateResponsiveOptions();
      this.loadArticles();
    }
  }

  private updateResponsiveOptions(): void {
    const numVisible = this.cardsToShow;
    const numScroll = this.cardsToShow === 1 ? 1 : 1; // Scroll one at a time for multiple cards, always 1 for single

    this.currentResponsiveOptions = [
      { breakpoint: '1199px', numVisible: numVisible, numScroll: numScroll },
      { breakpoint: '991px', numVisible: Math.min(numVisible, 2), numScroll: numScroll }, // Show max 2 on medium screens
      { breakpoint: '767px', numVisible: 1, numScroll: 1 } // Always show 1 on small screens
    ];
  }

  private async loadArticles(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const allArticles = await this.articleService.getAll();
      const articlesWithAuthors = await Promise.all(allArticles.map(async article => {
        if (article.authorId && !article.authorName) {
          const author = await this.authorService.getById(article.authorId);
          return { ...article, authorName: author?.name || 'Unknown Author' };
        }
        return article;
      }));

      const availableArticles = articlesWithAuthors.filter(article => article.id !== this.currentArticleId && article.isPublished);

      if (this.isFeaturedCarousel) {
        this.articles = availableArticles
          .filter(article => article.isFeatured)
          .sort((a, b) => {
            const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(a.publishDate || 0);
            const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(b.publishDate || 0);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 10);
      } else if (this.authorId) {
        this.articles = availableArticles
          .filter(article => article.authorId === this.authorId)
          .sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.publishDate || 0);
            const dateB = new Date(b.updatedAt || b.publishDate || 0);
            return dateB.getTime() - dateA.getTime();
          });
      } else if (this.currentArticleId && this.currentArticleTags.length > 0) {
        this.headerText = 'Related Articles';

        const filteredArticles = new Set<Article>();

        if (this.currentArticleAuthorId) {
          availableArticles
            .filter(article => article.authorId === this.currentArticleAuthorId)
            .forEach(article => filteredArticles.add(article));
        }

        if (this.currentArticleTags && this.currentArticleTags.length > 0) {
          availableArticles
            .filter(article =>
              article.tags && article.tags.some(tag => this.currentArticleTags.includes(tag))
            )
            .forEach(article => filteredArticles.add(article));
        }

        let relatedArticles = Array.from(filteredArticles);

        if (relatedArticles.length > 0) {
          relatedArticles.sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.publishDate || 0);
            const dateB = new Date(b.updatedAt || b.publishDate || 0);

            const isAByCurrentAuthor = a.authorId === this.currentArticleAuthorId;
            const isBByCurrentAuthor = b.authorId === this.currentArticleAuthorId;

            if (isAByCurrentAuthor && !isBByCurrentAuthor) return -1;
            if (!isAByCurrentAuthor && isBByCurrentAuthor) return 1;

            const aHasCommonTags = a.tags && a.tags.some(tag => this.currentArticleTags.includes(tag));
            const bHasCommonTags = b.tags && b.tags.some(tag => this.currentArticleTags.includes(tag));

            if (aHasCommonTags && !bHasCommonTags) return -1;
            if (!aHasCommonTags && bHasCommonTags) return 1;

            return dateB.getTime() - dateA.getTime();
          });
        }

        if (relatedArticles.length === 0) {
          this.headerText = 'Latest Articles';
          relatedArticles = availableArticles
            .sort((a, b) => {
              const dateA = new Date(a.updatedAt || a.publishDate || 0);
              const dateB = new Date(b.updatedAt || b.publishDate || 0);
              return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 10);
        }

        this.articles = relatedArticles;

      } else {
        this.articles = availableArticles
          .filter(article => !article.isFeatured)
          .sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.publishDate || 0);
            const dateB = new Date(b.updatedAt || b.publishDate || 0);
            return dateB.getTime() - dateA.getTime();
          });
      }
    } catch (err) {
      console.error('Failed to load articles:', err);
      this.error = 'Failed to load articles. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
}
