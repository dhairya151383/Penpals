import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ArticleListCarouselComponent } from '../../articles/article-list-carousel/article-list-carousel.component';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    ArticleListCarouselComponent
  ],
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  author: Author | null = null;
  canEdit = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    try {
      this.author = await this.authorService.getById(id);
      this.authService.user$.subscribe(user => {
        const uid = user?.uid ?? null;
        this.canEdit = uid === this.author?.id;
      });
    } catch (error) {
      console.error('Error fetching author details:', error);
      // Handle error, e.g., show a message to the user
    } finally {
      this.loading = false;
    }
  }
}