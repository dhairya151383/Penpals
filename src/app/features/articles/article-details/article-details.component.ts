// src/app/pages/article-details/article-details.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'; // Import NavigationEnd
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
import { Subscription } from 'rxjs'; // Import Subscription
import { filter, switchMap } from 'rxjs/operators'; // Import operators

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
  private routeSubscription: Subscription | undefined; // New subscription for route params

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.routeSubscription = this.route.paramMap.pipe(
      // Use switchMap to cancel previous article fetches if params change rapidly
      switchMap(params => {
        this.loading = true; // Set loading to true when new article fetch starts
        const id = params.get('id');
        if (!id) {
          this.loading = false;
          return Promise.resolve(null); // Return a resolved promise with null if no ID
        }
        return this.articleService.getById(id);
      })
    ).subscribe({
      next: (article: Article | null) => {
        if (!article) {
          console.warn('Article not found');
          this.loading = false;
          this.article = null; // Clear article if not found
          this.author = null; // Clear author as well
          return;
        }
        this.article = article;
        this.selectedTab = 'overview'; // Reset tab on new article load

        // Fetch author only after article is loaded
        if (article.authorId) {
          this.authorService.getById(article.authorId).then(author => {
            this.author = author;
            this.checkEditPermissions(); // Check permissions after author and article are loaded
          }).catch(err => {
            console.error('Error loading author:', err);
            this.author = null;
            this.checkEditPermissions();
          });
        } else {
          this.author = null;
          this.checkEditPermissions();
        }
        // Loading is set to false in checkEditPermissions after all async ops
      },
      error: (err) => {
        console.error('Error loading article details:', err);
        this.loading = false;
        this.article = null;
        this.author = null;
      }
    });

    // Initial check for edit permissions, also handled in the paramMap subscription chain
    // (Moved the actual permission check into a separate method for clarity)
  }

  private checkEditPermissions(): void {
    // This is called after article and author are potentially loaded
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
      this.loading = false; // Finally set loading to false here
    });
  }


  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.routeSubscription) { // Unsubscribe from route params
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