import { Component, OnInit, OnDestroy } from '@angular/core'; // Add OnDestroy
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ArticleListCarouselComponent } from '../../articles/article-list-carousel/article-list-carousel.component';
import { Observable, combineLatest, from, Subscription } from 'rxjs'; // Import necessary RxJS
import { switchMap, tap, filter, map, catchError } from 'rxjs/operators'; // Import operators

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
export class AuthorDetailsComponent implements OnInit, OnDestroy { // Implement OnDestroy
  author: Author | null = null;
  canEdit = false;
  loading = true; // Set to true initially, will be set to false by observable
  private subscriptions = new Subscription(); // To manage subscriptions

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true; // Ensure loading is true when starting to fetch

    const authorId$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id) // Only proceed if id exists
    );

    this.subscriptions.add(
      combineLatest([
        authorId$.pipe(
          switchMap(id => from(this.authorService.getById(id!))) // Convert Promise to Observable
        ),
        this.authService.user$.pipe(
          filter(user => this.authService.authReady$.value), // Ensure auth state is ready
          map(user => user?.uid ?? null) // Get the UID
        )
      ]).pipe(
        tap(([author, currentUserId]) => {
          this.author = author;
          this.canEdit = currentUserId === author?.id;
          this.loading = false; // Set loading to false once all data is available
           console.log('Author ID:', author?.id);
      console.log('Logged-in User UID:', currentUserId);
      console.log('Can Edit (author.id === user.uid):', this.canEdit);
        }),
        catchError(error => {
          console.error('Error fetching author details or user:', error);
          this.loading = false;
          // Optionally show an error message to the user
          return []; // Return an empty observable to complete the stream
        })
      ).subscribe() // Subscribe to initiate the data flow
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe to prevent memory leaks
  }
}