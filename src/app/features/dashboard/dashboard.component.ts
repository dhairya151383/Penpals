import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription, combineLatest, startWith, switchMap, finalize, catchError } from 'rxjs';
import { of } from 'rxjs'; // Import 'of' for returning observables in catchError
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
  allArticles: Article[] = []; // Stores all fetched articles
  displayArticles: Article[] = []; // Articles for the current page
  filteredArticles: Article[] = []; // Articles after search and tag filters, before pagination

  allTags: string[] = []; // All unique tags from articles
  selectedTags: string[] = []; // Tags currently selected by the user

  loading = true; // Controls the loading spinner
  errorMessage: string | null = null; // Stores error messages for display

  searchQuery = ''; // Current search input value
  private searchSubject = new Subject<string>(); // RxJS subject for search input
  private tagsSubject = new Subject<string[]>(); // RxJS subject for selected tags
  private sortSubject = new Subject<string>(); // RxJS subject for sort option

  private subscriptions = new Subscription(); // To manage all RxJS subscriptions

  isDropdownOpen = false; // Controls the visibility of the tags dropdown

  currentPage = 1; // Current page number for pagination
  itemsPerPage = 12; // Number of articles per page
  selectedSortOption: string = 'latest'; // Default sort option

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.loadArticles(); // Initial data loading
    this.setupFiltering(); // Set up the reactive filtering/sorting/pagination pipeline
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Clean up all subscriptions on component destruction
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    // Close dropdown if click is outside the tags container
    const target = event.target as HTMLElement;
    if (this.isDropdownOpen && !target.closest('.tags-dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

  /**
   * Fetches all articles and enriches them with author names.
   * Handles loading and error states.
   */
  public async loadArticles(): Promise<void> {
    this.loading = true;
    this.errorMessage = null; // Clear previous errors

    try {
      const fetchedArticles = await this.articleService.getAll();

      // Use Promise.all for concurrent author fetching for better performance
      this.allArticles = await Promise.all(
        fetchedArticles.map(async article => {
          if (article.authorId && !article.authorName) {
            const author = await this.authorService.getById(article.authorId);
            return { ...article, authorName: author?.name || 'Unknown Author' };
          }
          return article;
        })
      );

      // Extract unique tags from all articles
      const uniqueTags = new Set<string>();
      this.allArticles.forEach(article => {
        article.tags?.forEach(tag => uniqueTags.add(tag));
      });
      this.allTags = Array.from(uniqueTags).sort();

      // Initial application of filters after data is loaded
      this.searchSubject.next(this.searchQuery); // Trigger initial search filtering
      this.tagsSubject.next(this.selectedTags);   // Trigger initial tag filtering
      this.sortSubject.next(this.selectedSortOption); // Trigger initial sorting

    } catch (error) {
      console.error('Error fetching articles:', error);
      this.errorMessage = 'Failed to load articles. Please try again later.';
      this.allArticles = []; // Ensure articles array is empty on error
      this.filteredArticles = []; // Clear filtered articles as well
      this.displayArticles = []; // Clear display articles
    } finally {
      this.loading = false;
    }
  }

  /**
   * Sets up the RxJS pipeline for filtering, sorting, and pagination.
   * Debounces search input and combines all filter criteria.
   */
  private setupFiltering(): void {
    const search$ = this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after last keystroke
      distinctUntilChanged(), // Only emit if value has changed
      startWith(this.searchQuery) // Emit initial value
    );
    const tags$ = this.tagsSubject.pipe(startWith(this.selectedTags));
    const sort$ = this.sortSubject.pipe(startWith(this.selectedSortOption));

    this.subscriptions.add(
      combineLatest([search$, tags$, sort$]).subscribe(
        ([searchQuery, selectedTags, selectedSortOption]) => {
          // Update component properties
          this.searchQuery = searchQuery;
          this.selectedTags = selectedTags;
          this.selectedSortOption = selectedSortOption;
          // Apply filters and re-calculate pagination
          this.applyFiltersAndPagination();
        }
      )
    );
  }

  /**
   * Emits the new search query through the search subject.
   * Resets to the first page.
   */
  onSearchChange(value: string): void {
    this.searchSubject.next(value);
    this.currentPage = 1; // Reset to first page on new search
  }

  /**
   * Toggles the visibility of the tags dropdown menu.
   */
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Handles changes to individual tag checkboxes.
   * Updates selected tags and emits through the tags subject.
   * Resets to the first page.
   */
  onTagCheckboxChange(tag: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTags = [...this.selectedTags, tag]; // Immutable update
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag); // Immutable update
    }
    this.selectedTags.sort(); // Keep tags sorted for consistency
    this.tagsSubject.next(this.selectedTags);
    this.currentPage = 1; // Reset to first page on tag change
  }

  /**
   * Checks if a given tag is currently selected.
   * @param tag The tag string to check.
   * @returns True if the tag is selected, false otherwise.
   */
  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  /**
   * Toggles selection of all available tags.
   * Emits updated selected tags and resets to the first page.
   */
  toggleSelectAllTags(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTags = [...this.allTags]; // Select all unique tags
    } else {
      this.selectedTags = []; // Deselect all
    }
    this.tagsSubject.next(this.selectedTags);
    this.currentPage = 1; // Reset to first page
  }

  /**
   * Emits the new sort option through the sort subject.
   * Resets to the first page.
   */
  onSortChange(): void {
    this.sortSubject.next(this.selectedSortOption);
    this.currentPage = 1; // Reset to first page on sort change
  }

  /**
   * Applies all current filters (search, tags) and sorting to the
   * `allArticles` array, then updates `filteredArticles` and pagination.
   */
  applyFiltersAndPagination(): void {
    let tempArticles = [...this.allArticles];

    // Filter out featured and unpublished articles first
    tempArticles = tempArticles.filter(article => !article.isFeatured && article.isPublished);

    // Apply search query filter
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

    // Apply tag filter
    if (this.selectedTags.length > 0) {
      tempArticles = tempArticles.filter((article) =>
        article.tags?.some((articleTag) => this.selectedTags.includes(articleTag))
      );
    }

    // Apply sorting
    tempArticles = this.applySorting(tempArticles);

    // Update the filtered articles array
    this.filteredArticles = tempArticles;

    // Update the articles shown on the current page
    this.updatePagination();
  }

  /**
   * Sorts the given array of articles based on the `selectedSortOption`.
   * @param articles The array of articles to sort.
   * @returns The sorted array of articles.
   */
  private applySorting(articles: Article[]): Article[] {
    // Sort in place, so work on a copy if you want to preserve original order outside this function
    return [...articles].sort((a, b) => {
      switch (this.selectedSortOption) {
        case 'latest':
          // Prioritize updatedAt, then publishDate, then fallback to 0 (epoch)
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.publishDate ? new Date(a.publishDate).getTime() : 0);
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.publishDate ? new Date(b.publishDate).getTime() : 0);
          return dateB - dateA; // Newest first
        case 'popular':
          return (b.likesCount || 0) - (a.likesCount || 0); // Most popular first
        case 'titleAsc':
          return a.title.localeCompare(b.title); // Alphabetical A-Z
        default:
          // Default to latest if option is unknown
          const defaultDateA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.publishDate ? new Date(a.publishDate).getTime() : 0);
          const defaultDateB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.publishDate ? new Date(b.publishDate).getTime() : 0);
          return defaultDateB - defaultDateA;
      }
    });
  }

  /**
   * Calculates the articles to display for the current page.
   */
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

  /**
   * Calculates the total number of pages based on filtered articles and items per page.
   */
  get totalPages(): number {
    return Math.ceil(this.filteredArticles.length / this.itemsPerPage);
  }

  /**
   * Generates an array of page numbers for pagination controls.
   */
  get pages(): number[] {
    // Only show page numbers if there's more than one page
    if (this.totalPages <= 1) return [];

    const visiblePages = 5; // Max number of page buttons to show
    let startPage: number, endPage: number;

    if (this.totalPages <= visiblePages) {
      // Less than 5 total pages so show all
      startPage = 1;
      endPage = this.totalPages;
    } else {
      // More than 5 total pages so calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(visiblePages / 2);
      const maxPagesAfterCurrentPage = Math.ceil(visiblePages / 2) - 1;
      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = visiblePages;
      } else if (this.currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
        // current page near the end
        startPage = this.totalPages - visiblePages + 1;
        endPage = this.totalPages;
      } else {
        // current page somewhere in the middle
        startPage = this.currentPage - maxPagesBeforeCurrentPage;
        endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }
    return Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i);
  }

  /**
   * Navigates to a specific page.
   * @param page The page number to navigate to.
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && this.currentPage !== page) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  /**
   * Navigates to the next page.
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  /**
   * Navigates to the previous page.
   */
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}