import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel
import { RouterModule } from '@angular/router'; // For routerLink in card


import { debounceTime, distinctUntilChanged, Subject, Subscription, combineLatest, startWith, map } from 'rxjs'; // For search and filtering
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { Article } from '../../../shared/models/article.model';
import { ArticleCardComponent } from '../components/article-card/article-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingSpinnerComponent,
    ArticleCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  allTags: string[] = []; // To store all unique tags from articles
  selectedTags: string[] = []; // Tags currently selected for filtering

  loading = true;
  errorMessage: string | null = null;

  // Search properties
  searchQuery = '';
  private searchSubject = new Subject<string>();
  private subscriptions = new Subscription();

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 12; // Maximum 12 cards per page

  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService // Inject author service
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      // Fetch all articles
      const fetchedArticles = await this.articleService.getAll();

      // Fetch author names for articles
      this.articles = await Promise.all(fetchedArticles.map(async article => {
        if (article.authorId && !article.authorName) {
          const author = await this.authorService.getById(article.authorId);
          return { ...article, authorName: author?.name || 'Unknown Author' };
        }
        return article;
      }));

      // Extract unique tags
      const uniqueTags = new Set<string>();
      this.articles.forEach(article => {
        article.tags?.forEach(tag => uniqueTags.add(tag));
      });
      this.allTags = Array.from(uniqueTags);

      // Setup RxJS for filtering and search
      this.setupFiltering();

    } catch (error) {
      console.error('Error fetching articles:', error);
      this.errorMessage = 'Failed to load articles. Please try again later.';
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private setupFiltering(): void {
    const search$ = this.searchSubject.pipe(
      startWith(this.searchQuery), // Emit initial search query
      debounceTime(300),
      distinctUntilChanged()
    );

    const tags$ = new Subject<string[]>(); // Subject for tag changes
    this.subscriptions.add(tags$.subscribe(selectedTags => {
      this.selectedTags = selectedTags;
      this.applyFiltersAndPagination(); // Re-apply filters on tag change
    }));


    this.subscriptions.add(
      combineLatest([search$]).subscribe(([searchQuery]) => {
        this.searchQuery = searchQuery; // Update searchQuery when search input changes
        this.applyFiltersAndPagination();
      })
    );
    // Initial application of filters
    this.applyFiltersAndPagination();
  }


  onSearchChange(value: string): void {
    this.searchSubject.next(value);
    this.currentPage = 1; // Reset to first page on new search
  }

  onTagClick(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1); // Remove tag if already selected
    } else {
      this.selectedTags.push(tag); // Add tag if not selected
    }
    // Manually trigger filter application as tags$ is not used directly for this anymore
    this.applyFiltersAndPagination();
    this.currentPage = 1; // Reset to first page on tag change
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }


  applyFiltersAndPagination(): void {
    let tempArticles = [...this.articles];

    // Apply search filter
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
        this.selectedTags.every((tag) => article.tags?.includes(tag))
      );
    }

    this.filteredArticles = tempArticles;
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    // Slice based on filteredArticles, not original articles
    this.articles = this.filteredArticles.slice(startIndex, endIndex);
  }

  // Pagination handlers
  get totalPages(): number {
    return Math.ceil(this.filteredArticles.length / this.itemsPerPage);
  }

  get pages(): number[] {
    // Generate an array of page numbers for the pagination controls
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
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