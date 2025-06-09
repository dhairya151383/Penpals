import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription, combineLatest, startWith } from 'rxjs';
import { ArticleService } from '../../core/services/article.service';
import { AuthorService } from '../../core/services/author.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Article } from '../../shared/models/article.model';
import { ArticleCardComponent } from '../articles/article-card/article-card.component';
import { ArticleListCarouselComponent } from '../articles/article-list-carousel/article-list-carousel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingSpinnerComponent,
    ArticleCardComponent,
    ArticleListCarouselComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  allArticles: Article[] = [];
  displayArticles: Article[] = [];
  filteredArticles: Article[] = [];

  allTags: string[] = [];
  selectedTags: string[] = [];

  loading = true;
  errorMessage: string | null = null;

  searchQuery = '';
  private searchSubject = new Subject<string>();
  private tagsSubject = new Subject<string[]>();
  private sortSubject = new Subject<string>();

  private subscriptions = new Subscription();

  isDropdownOpen = false;

  currentPage = 1;
  itemsPerPage = 12;
  selectedSortOption: string = 'latest';

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.loadArticles();
    this.setupFiltering();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.isDropdownOpen && !target.closest('.tags-dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

  public async loadArticles(): Promise<void> {
    this.loading = true;
    this.errorMessage = null;

    try {
      const fetchedArticles = await this.articleService.getAll();

      this.allArticles = await Promise.all(
        fetchedArticles.map(async article => {
          if (article.authorId && !article.authorName) {
            const author = await this.authorService.getById(article.authorId);
            return { ...article, authorName: author?.name || 'Unknown Author' };
          }
          return article;
        })
      );

      const uniqueTags = new Set<string>();
      this.allArticles.forEach(article => {
        article.tags?.forEach(tag => uniqueTags.add(tag));
      });
      this.allTags = Array.from(uniqueTags).sort();

      this.searchSubject.next(this.searchQuery);
      this.tagsSubject.next(this.selectedTags);
      this.sortSubject.next(this.selectedSortOption);

    } catch (error) {
      console.error('Error fetching articles:', error);
      this.errorMessage = 'Failed to load articles. Please try again later.';
      this.allArticles = [];
      this.filteredArticles = [];
      this.displayArticles = [];
    } finally {
      this.loading = false;
    }
  }

  private setupFiltering(): void {
    const search$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(this.searchQuery)
    );
    const tags$ = this.tagsSubject.pipe(startWith(this.selectedTags));
    const sort$ = this.sortSubject.pipe(startWith(this.selectedSortOption));

    this.subscriptions.add(
      combineLatest([search$, tags$, sort$]).subscribe(
        ([searchQuery, selectedTags, selectedSortOption]) => {
          this.searchQuery = searchQuery;
          this.selectedTags = selectedTags;
          this.selectedSortOption = selectedSortOption;
          this.applyFiltersAndPagination();
        }
      )
    );
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
    this.currentPage = 1;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onTagCheckboxChange(tag: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTags = [...this.selectedTags, tag];
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.selectedTags.sort();
    this.tagsSubject.next(this.selectedTags);
    this.currentPage = 1;
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  toggleSelectAllTags(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTags = [...this.allTags];
    } else {
      this.selectedTags = [];
    }
    this.tagsSubject.next(this.selectedTags);
    this.currentPage = 1;
  }

  onSortChange(): void {
    this.sortSubject.next(this.selectedSortOption);
    this.currentPage = 1;
  }

  applyFiltersAndPagination(): void {
    let tempArticles = [...this.allArticles];

    tempArticles = tempArticles.filter(article => !article.isFeatured && article.isPublished);

    if (this.searchQuery) {
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      tempArticles = tempArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerCaseQuery) ||
          article.briefDescription.toLowerCase().includes(lowerCaseQuery) ||
          article.authorName?.toLowerCase().includes(lowerCaseQuery) ||
          article.tags?.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
      );
    }

    if (this.selectedTags.length > 0) {
      tempArticles = tempArticles.filter((article) =>
        article.tags?.some((articleTag) => this.selectedTags.includes(articleTag))
      );
    }

    tempArticles = this.applySorting(tempArticles);

    this.filteredArticles = tempArticles;

    this.updatePagination();
  }

  private applySorting(articles: Article[]): Article[] {
    return [...articles].sort((a, b) => {
      switch (this.selectedSortOption) {
        case 'latest':
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.publishDate ? new Date(a.publishDate).getTime() : 0);
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.publishDate ? new Date(b.publishDate).getTime() : 0);
          return dateB - dateA;
        case 'popular':
          return (b.likesCount || 0) - (a.likesCount || 0);
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        default:
          const defaultDateA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.publishDate ? new Date(a.publishDate).getTime() : 0);
          const defaultDateB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.publishDate ? new Date(b.publishDate).getTime() : 0);
          return defaultDateB - defaultDateA;
      }
    });
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredArticles.length / this.itemsPerPage);
  }

  get pages(): number[] {
    if (this.totalPages <= 1) return [];

    const visiblePages = 5;
    let startPage: number, endPage: number;

    if (this.totalPages <= visiblePages) {
      startPage = 1;
      endPage = this.totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(visiblePages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(visiblePages / 2) - 1;
      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = visiblePages;
      } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
        startPage = this.totalPages - visiblePages + 1;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - maxPagesBeforeCurrentPage;
        endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }
    return Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && this.currentPage !== page) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}