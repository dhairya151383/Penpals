import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Author } from '../../../shared/models/author.model';
import { AuthorService } from '../../../core/services/author.service';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  error: string | null = null;

  constructor(private authorService: AuthorService) {}

  async ngOnInit() {
    this.loading = true;
    this.error = null;

    try {
      this.authors = await this.authorService.getAll();
      this.applyFilters();
    } catch (err) {
      console.error('Error fetching authors:', err);
      this.error = 'Failed to load authors. Please try again later.';
      this.authors = [];
    } finally {
      this.loading = false;
    }
  }

  getTruncatedBio(bio?: string): string {
    if (!bio) return '';
    const limit = 150;
    return bio.length > limit ? bio.slice(0, limit) + '...' : bio;
  }

  applyFilters() {
    let tempAuthors = [...this.authors];

    if (this.filterTerm) {
      tempAuthors = tempAuthors.filter(author =>
        author.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    }

    tempAuthors.sort((a, b) => {
      switch (this.sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'date-newest':
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        case 'date-oldest':
          const dateAOld = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateBOld = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateAOld - dateBOld;
        default:
          return 0;
      }
    });

    this.filteredAuthors = tempAuthors;
  }
}