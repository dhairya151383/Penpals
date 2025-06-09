import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetailsComponent } from './article-details.component';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { AuthService, AppUser } from '../../../core/services/auth.service';
import { Article } from '../../../shared/models/article.model';
import { Author } from '../../../shared/models/author.model';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;
  let mockArticleService: any;
  let mockAuthorService: any;
  let mockAuthService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  const mockArticle: Article = {
    id: '1',
    title: 'Test Article',
    briefDescription: 'Brief Description',
    content: 'Full content of the article',
    authorId: '123',
    publishDate: new Date(),
  };

  const mockAuthor: Author = {
    id: '123',
    name: 'Test Author',
    bio: '',
  };

  beforeEach(async () => {
    mockRouter = { navigate: jest.fn() };

    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => (key === 'id' ? '1' : null),
      }),
    };

    mockArticleService = {
      getById: jest.fn().mockResolvedValue(mockArticle),
    };

    mockAuthorService = {
      getById: jest.fn().mockResolvedValue(mockAuthor),
    };

    mockAuthService = {
      user$: new Subject<AppUser | null>(),
    };

    await TestBed.configureTestingModule({
      imports: [ArticleDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ArticleService, useValue: mockArticleService },
        { provide: AuthorService, useValue: mockAuthorService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load article and author and set canEdit for matching author', async () => {
    const user = {
      uid: '123',
      displayName: 'Author User',
      email: 'author@example.com',
      roles: { author: true },
    } as Partial<AppUser> as AppUser;

    mockAuthService.user$.next(user);

    await Promise.resolve(); // wait for async calls
    expect(component.article?.id).toBe('1');
    expect(component.author?.id).toBe('123');
    expect(component.canEdit).toBe(true);
  });

  it('should not allow editing if user is not author or admin', async () => {
    const user = {
      uid: '456',
      displayName: 'Viewer',
      email: 'viewer@example.com',
      roles: { author: true }, // different UID
    } as Partial<AppUser> as AppUser;

    mockAuthService.user$.next(user);

    await Promise.resolve();
    expect(component.canEdit).toBe(false);
  });

  it('should navigate to edit page', () => {
    component.article = mockArticle;
    component.goToEdit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-article', '1']);
  });

  it('should navigate to author details page', () => {
    component.goToAuthorDetails('123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/author', '123']);
  });

  it('should unsubscribe on destroy', () => {
    const spy = jest.spyOn(component['authSubscription']!, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
