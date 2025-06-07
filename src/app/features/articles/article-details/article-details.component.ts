// src/app/pages/article-details/article-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../shared/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ArticleDatePipe } from '../../../shared/pipes/article-date.pipe';
import { CommentPanelComponent } from '../comment-panel/comment-panel.component';
import { ArticleListCarouselComponent } from '../article-list-carousel/article-list-carousel.component';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoadingSpinnerComponent,
    ArticleDatePipe,
    CommentPanelComponent,
    ArticleListCarouselComponent, 
  ],
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | null = null;
  author: Author | null = null;
  canEdit = false;
  loading = true;
  showComments = false;
  selectedTab: 'overview' | 'content' | 'author' = 'overview'; // Added for tab view

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    try {
      const article = await this.articleService.getById(id);
      if (!article) {
        console.warn('Article not found');
        return;
      }
      this.article = article;
      if (article.authorId) {
        this.author = await this.authorService.getById(article.authorId);
      }

      this.authService.user$.subscribe((user) => {
        this.canEdit = !!user && user.uid === this.author?.id;
      });
    } catch (err) {
      console.error('Error loading article details:', err);
    } finally {
      this.loading = false;
    }
  }
  selectTab(tab: 'overview' | 'content' | 'author'): void {
    this.selectedTab = tab;
  }

  goToEdit() {
    if (this.article?.id) {
      this.router.navigate(['/edit-article', this.article.id]);
    }
  }
}