import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { AuthService, AppUser } from '../../../core/services/auth.service'; // Import AppUser
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ArticleListCarouselComponent } from '../../articles/article-list-carousel/article-list-carousel.component';
import { Observable, combineLatest, from, Subscription, of } from 'rxjs'; // Import 'of'
import { switchMap, tap, filter, map, catchError } from 'rxjs/operators';

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
export class AuthorDetailsComponent implements OnInit, OnDestroy {
  author: Author | null = null;
  canEdit = false;
  loading = true;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;

    const authorId$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id)
    );

    this.subscriptions.add(
      combineLatest([
        authorId$.pipe(
          switchMap(id => from(this.authorService.getById(id!)).pipe(
            catchError(err => {
              console.error('Error fetching author:', err);
              // Handle specific error (e.g., author not found)
              // Maybe navigate to a 404 page or display a message
              this.author = null; // Ensure author is null on error
              return of(null); // Return observable of null to continue combineLatest
            })
          ))
        ),
        this.authService.user$.pipe(
          filter(user => this.authService.authReady$.value), // Ensure auth state is ready
          // No map to UID here, we need the whole user object to check roles
          catchError(err => {
            console.error('Error fetching auth user:', err);
            return of(null); // Return observable of null to continue combineLatest
          })
        )
      ]).pipe(
        tap(([author, appUser]) => { // Renamed user to appUser for clarity as it's AppUser type
          this.author = author;

          // Determine canEdit logic
          const currentUserId = appUser?.uid ?? null;
          const isAdmin = (appUser as AppUser)?.roles?.admin === true; // Check admin role

          // An author can edit their own profile OR if the user is an admin
          this.canEdit = (currentUserId !== null && currentUserId === author?.id) || isAdmin;

          this.loading = false; // Data is loaded (or an error occurred and we handled it)

          // Debugging logs (can be removed in production)
          console.log('Author ID:', author?.id);
          console.log('Logged-in User UID:', currentUserId);
          console.log('Is Admin:', isAdmin);
          console.log('Can Edit (author.id === user.uid || isAdmin):', this.canEdit);
        }),
        catchError(error => {
          // This outer catchError is for errors occurring within the combineLatest pipeline itself,
          // less likely if inner catchErrors are handled, but good for robustness.
          console.error('Error in combineLatest stream:', error);
          this.loading = false;
          return []; // Return an empty observable to complete the stream
        })
      ).subscribe(
        () => {
          // Optional: handle successful emission if needed, though tap usually suffices
        },
        (error) => {
          // Handle subscription-level errors if any were not caught by catchError operators
          console.error('Subscription error in AuthorDetailsComponent:', error);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}