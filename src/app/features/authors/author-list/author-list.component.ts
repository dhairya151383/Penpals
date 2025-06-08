import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Author } from '../../../shared/models/author.model';
import { AuthorService } from '../../../core/services/author.service';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { catchError } from 'rxjs/operators'; // Import catchError
import { of } from 'rxjs'; // Import of to return an observable

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  filterTerm = '';
  sortOption = 'name-asc';
  loading = false;
  error: string | null = null; // Add an error property

  constructor(private authorService: AuthorService) {}

  async ngOnInit() {
    this.loading = true;
    this.error = null; // Clear any previous error

    try {
      this.authors = await this.authorService.getAll();
      this.applyFilters(); // Apply filters immediately after loading authors
    } catch (err) {
      console.error('Error fetching authors:', err);
      this.error = 'Failed to load authors. Please try again later.';
      this.authors = []; // Ensure authors array is empty on error
    } finally {
      this.loading = false;
    }
  }

  /**
   * Truncates the author bio for display, adding an ellipsis if it exceeds the limit.
   * @param bio The author's biography string.
   * @returns The truncated bio or an empty string if bio is null/undefined.
   */
  getTruncatedBio(bio?: string): string {
    if (!bio) return '';
    const limit = 150; // Define limit as a constant or class property
    return bio.length > limit ? bio.slice(0, limit) + '...' : bio;
  }

  /**
   * Applies the current filter term and sort option to the list of authors.
   * This method is called on input changes to the filter term and select changes to the sort option.
   */
  applyFilters() {
    let tempAuthors = [...this.authors]; // Create a mutable copy

    // 1. Filter
    if (this.filterTerm) {
      tempAuthors = tempAuthors.filter(author =>
        author.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }

    // 2. Sort
    tempAuthors.sort((a, b) => {
      switch (this.sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-newest':
          // Ensure createdAt exists before comparing, provide fallback if not
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        case 'date-oldest':
          const dateAOld = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateBOld = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateAOld - dateBOld;
        default:
          return 0; // No sort or unknown option
      }
    });

    this.filteredAuthors = tempAuthors;
  }
}