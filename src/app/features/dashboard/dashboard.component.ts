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
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingSpinnerComponent,
    ArticleCardComponent,
    CarouselModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  allArticles: Article[] = [];
  displayArticles: Article[] = [];
  filteredArticles: Article[] = [];
  featuredArticles: Article[] = [];

  allTags: string[] = [];
  selectedTags: string[] = [];

  loading = true;
  errorMessage: string | null = null;

  searchQuery = '';
  private searchSubject = new Subject<string>();
  private tagsSubject = new Subject<string[]>();
  private subscriptions = new Subscription();

  isDropdownOpen = false;

  currentPage = 1;
  itemsPerPage = 12;

  // Responsive options for PrimeNG Carousel
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  constructor(
    private articleService: ArticleService,
    private authorService: AuthorService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const fetchedArticles = await this.articleService.getAll();

      this.allArticles = await Promise.all(fetchedArticles.map(async article => {
        if (article.authorId && !article.authorName) {
          const author = await this.authorService.getById(article.authorId);
          return { ...article, authorName: author?.name || 'Unknown Author' };
        }
        return article;
      }));

      // Filter and sort featured articles
      this.featuredArticles = this.allArticles
        .filter(article => article.isFeatured && article.isPublished)
        .sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt) : new Date(a.publishDate || 0);
          const dateB = b.updatedAt ? new Date(b.updatedAt) : new Date(b.publishDate || 0);
          return dateB.getTime() - dateA.getTime(); // Sort by latest (descending)
        })
        .slice(0, 10); // Take a maximum of 10 articles

      const uniqueTags = new Set<string>();
      this.allArticles.forEach(article => {
        article.tags?.forEach(tag => uniqueTags.add(tag));
      });
      this.allTags = Array.from(uniqueTags).sort();

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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    // Check if the click was outside the dropdown container itself
    // We can rely on a single class to identify the dropdown and its toggle.
    if (this.isDropdownOpen && !target.closest('.tags-dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }

  private setupFiltering(): void {
    const search$ = this.searchSubject.pipe(
      startWith(this.searchQuery),
      debounceTime(300),
      distinctUntilChanged()
    );

    this.subscriptions.add(
      combineLatest([
        search$,
        this.tagsSubject.pipe(startWith(this.selectedTags))
      ]).subscribe(([searchQuery, selectedTags]) => {
        this.searchQuery = searchQuery;
        this.selectedTags = selectedTags;
        this.applyFiltersAndPagination();
      })
    );

    this.searchSubject.next(this.searchQuery);
    this.tagsSubject.next(this.selectedTags);
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
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.tagsSubject.next(this.selectedTags);
    this.currentPage = 1;
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  applyFiltersAndPagination(): void {
    let tempArticles = [...this.allArticles];

    // Exclude featured articles from the main list display
    // This assumes that featured articles are distinct from the regular list.
    // If featured articles should also appear in the main list, remove this line.
    tempArticles = tempArticles.filter(article => !article.isFeatured || !article.isPublished);


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

    // Apply tag filter with OR logic
    if (this.selectedTags.length > 0) {
      tempArticles = tempArticles.filter((article) =>
        // Check if the article has *any* of the selected tags
        this.selectedTags.some((selectedTag) => article.tags?.includes(selectedTag))
      );
    }

    this.filteredArticles = tempArticles;
    this.updatePagination();
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