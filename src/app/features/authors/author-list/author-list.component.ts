import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Author } from '../../../shared/models/author.model';
import { AuthorService } from '../../../core/services/author.service';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,LoadingSpinnerComponent],
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css'],
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  filterTerm = '';
  sortOption = 'name-asc';
  loading = false;
  constructor(private authorService: AuthorService) { }

  async ngOnInit() {
    this.loading = true;  
    this.authors = await this.authorService.getAll();
    this.loading = false;  
    this.applyFilters();
  }

  getTruncatedBio(bio?: string): string {
    if (!bio) return '';
    return bio.length > 150 ? bio.slice(0, 150) + '...' : bio;
  }
  applyFilters() {
    this.filteredAuthors = this.authors
      .filter(author =>
        author.name.toLowerCase().includes(this.filterTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (this.sortOption === 'name-asc') return a.name.localeCompare(b.name);
        if (this.sortOption === 'name-desc') return b.name.localeCompare(a.name);
        if (this.sortOption === 'date-newest') return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
        if (this.sortOption === 'date-oldest') return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
        return 0;
      });
  }
}
