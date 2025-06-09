import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../shared/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, AppUser } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ArticleDatePipe } from '../../../shared/pipes/article-date.pipe';
import { CommentPanelComponent } from '../comment-panel/comment-panel.component';
import { ArticleListCarouselComponent } from '../article-list-carousel/article-list-carousel.component';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

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
export class ArticleDetailsComponent implements OnInit, OnDestroy {
  article: Article | null = null;
  author: Author | null = null;
  canEdit = false;
  loading = true;
  showComments = false;
  selectedTab: 'overview' | 'content' = 'overview';

  private authSubscription: Subscription | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.loading = true;
        const id = params.get('id');
        if (!id) {
          this.loading = false;
          return Promise.resolve(null);
        }
        return this.articleService.getById(id);
      })
    ).subscribe({
      next: (article: Article | null) => {
        if (!article) {
          console.warn('Article not found');
          this.loading = false;
          this.article = null;
          this.author = null;
          return;
        }
        this.article = article;
        this.selectedTab = 'overview';

        if (article.authorId) {
          this.authorService.getById(article.authorId).then(author => {
            this.author = author;
            this.checkEditPermissions();
          }).catch(err => {
            console.error('Error loading author:', err);
            this.author = null;
            this.checkEditPermissions();
          });
        } else {
          this.author = null;
          this.checkEditPermissions();
        }
      },
      error: (err) => {
        console.error('Error loading article details:', err);
        this.loading = false;
        this.article = null;
        this.author = null;
      }
    });
  }

  private checkEditPermissions(): void {
    this.authSubscription = this.authService.user$.subscribe((user: AppUser | null) => {
      if (user) {
        if (user.roles?.admin) {
          this.canEdit = true;
        } else if (user.roles?.author && user.uid === this.author?.id) {
          this.canEdit = true;
        } else {
          this.canEdit = false;
        }
      } else {
        this.canEdit = false;
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  selectTab(tab: 'overview' | 'content'): void {
    this.selectedTab = tab;
  }

  goToEdit() {
    if (this.article?.id) {
      this.router.navigate(['/edit-article', this.article.id]);
    }
  }

  goToAuthorDetails(authorId: string | undefined): void {
    if (authorId) {
      this.router.navigate(['/author', authorId]);
    }
  }
}