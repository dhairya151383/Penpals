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

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent, ArticleDatePipe], // <<< ADD: Include the pipe in imports
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | null = null;
  author: Author | null = null;
  canEdit = false;
  loading = true;

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
      // <<< REMOVE THE DATE CONVERSION LOGIC FROM HERE >>>
      // The article fetched from articleService.getById(id)
      // will now *already* have its date properties (publishDate, createdAt, updatedAt)
      // converted to JavaScript Date objects by the ArticleService.
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

  goToEdit() {
    if (this.article?.id) {
      this.router.navigate(['/articles', this.article.id, 'edit']);
    }
  }
}