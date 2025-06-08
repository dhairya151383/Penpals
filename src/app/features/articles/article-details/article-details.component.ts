// src/app/pages/article-details/article-details.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core'; // Import OnDestroy
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
import { Subscription } from 'rxjs'; // Import Subscription

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
export class ArticleDetailsComponent implements OnInit, OnDestroy { // Implement OnDestroy
  article: Article | null = null;
  author: Author | null = null;
  canEdit = false;
  loading = true;
  showComments = false;
  selectedTab: 'overview' | 'content' = 'overview';

  private authSubscription: Subscription | undefined; // Declare a subscription variable

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    try {
      const article = await this.articleService.getById(id);
      if (!article) {
        console.warn('Article not found');
        this.loading = false; // Set loading to false if article is not found
        return;
      }
      this.article = article;

      if (article.authorId) {
        this.author = await this.authorService.getById(article.authorId);
      }

      // Subscribe to user$ to determine canEdit status
      // Assign the subscription to the private variable
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
        // This is where loading should finally be set to false after all checks
        this.loading = false;
      });

    } catch (err) {
      console.error('Error loading article details:', err);
      this.loading = false; // Ensure loading is false on error
    }
  }

  // Add ngOnDestroy to unsubscribe
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
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