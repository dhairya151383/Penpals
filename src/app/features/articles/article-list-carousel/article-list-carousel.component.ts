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
  @Input() currentArticleTags: string[] = []; // New input for current article's tags
  @Input() currentArticleAuthorId?: string; // New input for current article's author ID
  @Input() currentArticleId?: string; // New input for current article's ID

  articles: Article[] = [];
  loading: boolean = true;
  error: string | null = null;
  currentResponsiveOptions: any[];

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService
  ) {
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
    if (
      changes['authorId'] ||
      changes['isFeaturedCarousel'] ||
      changes['currentArticleTags'] ||
      changes['currentArticleAuthorId'] ||
      changes['currentArticleId']
    ) {
      this.updateResponsiveOptions();
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
      const allArticles = await this.articleService.getAll();
      const articlesWithAuthors = await Promise.all(allArticles.map(async article => {
        if (article.authorId && !article.authorName) {
          const author = await this.authorService.getById(article.authorId);
          return { ...article, authorName: author?.name || 'Unknown Author' };
        }
        return article;
      }));

      // Filter out the current article if currentArticleId is provided
      const availableArticles = articlesWithAuthors.filter(article => article.id !== this.currentArticleId && article.isPublished);

      if (this.isFeaturedCarousel) {
        this.articles = availableArticles
          .filter(article => article.isFeatured)
          .sort((a, b) => {
            const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(a.publishDate || 0);
            const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(b.publishDate || 0);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 10); // Take a maximum of 10 articles
      } else if (this.authorId) {
        // Existing logic for author-specific articles
        this.articles = availableArticles
          .filter(article => article.authorId === this.authorId)
          .sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.publishDate || 0);
            const dateB = new Date(b.updatedAt || b.publishDate || 0);
            return dateB.getTime() - dateA.getTime();
          });
      } else if (this.currentArticleId && this.currentArticleTags.length > 0) {
        // Logic for Related Articles
        this.headerText = 'Related Articles'; // Set header text for related articles

        const filteredArticles = new Set<Article>();

        // 1. Filter by Author
        if (this.currentArticleAuthorId) {
          availableArticles
            .filter(article => article.authorId === this.currentArticleAuthorId)
            .forEach(article => filteredArticles.add(article));
        }

        // 2. Filter by Tags
        if (this.currentArticleTags && this.currentArticleTags.length > 0) {
          availableArticles
            .filter(article =>
              article.tags && article.tags.some(tag => this.currentArticleTags.includes(tag))
            )
            .forEach(article => filteredArticles.add(article));
        }

        let relatedArticles = Array.from(filteredArticles);

        // 3. Sorting Filtered Articles
        if (relatedArticles.length > 0) {
          relatedArticles.sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.publishDate || 0);
            const dateB = new Date(b.updatedAt || b.publishDate || 0);

            // Primary Sort: Author's Latest Articles First
            const isAByCurrentAuthor = a.authorId === this.currentArticleAuthorId;
            const isBByCurrentAuthor = b.authorId === this.currentArticleAuthorId;

            if (isAByCurrentAuthor && !isBByCurrentAuthor) return -1;
            if (!isAByCurrentAuthor && isBByCurrentAuthor) return 1;

            // Secondary Sort: Same Tags (Latest First)
            const aHasCommonTags = a.tags && a.tags.some(tag => this.currentArticleTags.includes(tag));
            const bHasCommonTags = b.tags && b.tags.some(tag => this.currentArticleTags.includes(tag));

            if (aHasCommonTags && !bHasCommonTags) return -1;
            if (!aHasCommonTags && bHasCommonTags) return 1;

            // Sort by latest date if other criteria are equal
            return dateB.getTime() - dateA.getTime();
          });
        }

        // 4. Fallback: Latest Articles if no related articles found
        if (relatedArticles.length === 0) {
          this.headerText = 'Latest Articles'; // Update header for fallback
          relatedArticles = availableArticles
            .sort((a, b) => {
              const dateA = new Date(a.updatedAt || a.publishDate || 0);
              const dateB = new Date(b.updatedAt || b.publishDate || 0);
              return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 10); // Limit fallback to a reasonable number
        }

        this.articles = relatedArticles;

      } else {
        // Original logic for non-featured, non-author-specific articles (general latest)
        this.articles = availableArticles
          .filter(article => !article.isFeatured) // Ensure no featured articles in this general list
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