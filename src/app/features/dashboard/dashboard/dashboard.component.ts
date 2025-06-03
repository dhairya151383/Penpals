import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../shared/models/article.model';
import { ArticleCardComponent } from '../components/article-card/article-card.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { Tag } from '../../../shared/models/tag.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ArticleCardComponent, SearchBarComponent, TagSelectorComponent],
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .dashboard {
        max-width: 900px;
        margin: 1rem auto;
        padding: 0 1rem;
      }
      .loading,
      .error,
      .empty {
        text-align: center;
        font-size: 1.2rem;
        color: #666;
        margin: 1rem 0;
      }
      .articles-list {
        margin-top: 1rem;
      }
      .pagination {
        margin-top: 1rem;
        text-align: center;
      }
      .pagination button {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  pagedArticles: Article[] = [];

  loading = false;
  error: string | null = null;

  page = 1;
  pageSize = 5;
  totalPages = 1;
  filterTags: Tag[] = [];
  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  async fetchArticles() {
    this.loading = true;
    this.error = null;
    try {
      this.articles = await this.articleService.getAll();
      this.filteredArticles = [...this.articles];
      this.updatePagination();
    } catch (err) {
      this.error = 'Failed to load articles.';
    } finally {
      this.loading = false;
    }
  }

  onSearch(query: string) {
    query = query.trim().toLowerCase();
    this.page = 1;

    if (!query) {
      this.filteredArticles = [...this.articles];
    } else {
      this.filteredArticles = this.articles.filter((a) =>
        a.title.toLowerCase().includes(query) ||
        a.briefDescription.toLowerCase().includes(query) ||
        (a.tags && a.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredArticles.length / this.pageSize);
    this.pagedArticles = this.filteredArticles.slice(
      (this.page - 1) * this.pageSize,
      this.page * this.pageSize
    );
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
  onTagFilterChange(tags: Tag[]) {
    this.filterTags = tags;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.articles];

    if (this.filterTags.length > 0) {
      const tagNames = this.filterTags.map(tag => tag.name.toLowerCase());
      filtered = filtered.filter(article =>
        article.tags?.some(tag => tagNames.includes(tag.toLowerCase()))
      );
    }

    this.filteredArticles = filtered;
    this.page = 1;
    this.updatePagination();
  }
}
