import { Component, OnInit, OnDestroy } from '@angular/core'; // Import OnDestroy
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { ArticleService } from '../../../core/services/article.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { Article } from '../../../shared/models/article.model';
import { Tag } from '../../../shared/models/tag.model';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { UploadImageComponent } from '../../../shared/components/upload-image/upload-image.component';
import { Subscription } from 'rxjs'; // Import Subscription

export function quillRequired(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const text = value.replace(/<[^>]*>/g, '').trim();
  return text.length === 0 ? { required: true } : null;
}

export function minTagsSelected(min = 1): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value;
    if (Array.isArray(val) && val.length >= min) {
      return null;
    }
    return { required: true };
  };
}

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule,
    TagSelectorComponent,
    LoadingSpinnerComponent,
    UploadImageComponent,
  ],
  templateUrl: './article-upsert.component.html',
  styleUrls: ['./article-upsert.component.css'],
})
export class ArticleUpsertComponent implements OnInit, OnDestroy { // Implement OnDestroy
  form!: FormGroup;
  error: string | null = null;
  selectedTags: Tag[] = [];
  formSubmitted = false;
  loading = true;
  avatarUrl: string | null = null;
  articleId: string | null = null;
  isEditMode = false;
  originalArticle: Article | null = null;

  private readonly draftStorageKeyPrefix = 'article-upsert-draft-';
  private draftStorageKey!: string;
  private formChangesSubscription: Subscription | undefined; // Declare a subscription variable

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.articleId;

    this.draftStorageKey = this.draftStorageKeyPrefix + (this.articleId || 'new');

    try {
      this.form = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        briefDescription: ['', [Validators.required, Validators.minLength(10)]],
        content: ['', [quillRequired]],
        tags: [[], [minTagsSelected(1)]],
        isFeatured: [false],
        isPublished: [false],
      });

      if (this.isEditMode && this.articleId) {
        const article = await this.articleService.getById(this.articleId);
        if (article) {
          this.originalArticle = article;
          this.selectedTags = (article.tags || []).map((name) => ({ name, type: 'article' }));
          this.avatarUrl = article.thumbnailUrl || null;

          const draft = localStorage.getItem(this.draftStorageKey);
          if (draft) {
            const draftData = JSON.parse(draft);
            this.form.patchValue({
              title: draftData.title,
              briefDescription: draftData.briefDescription,
              content: draftData.content,
              isFeatured: draftData.isFeatured ?? false,
              isPublished: draftData.isPublished ?? false,
            });
            this.selectedTags = draftData.selectedTags || this.selectedTags;
            this.avatarUrl = draftData.thumbnailUrl || this.avatarUrl;
          } else {
            this.form.patchValue({
              title: article.title,
              briefDescription: article.briefDescription,
              content: article.content,
              isFeatured: article.isFeatured ?? false,
              isPublished: article.isPublished ?? false,
            });
          }
          this.form.get('tags')?.setValue(this.selectedTags);

        } else {
          this.error = 'Article not found.';
          this.loading = false;
          return;
        }
      }

      // Assign the subscription to the class property
      this.formChangesSubscription = this.form.valueChanges.subscribe(() => {
        this.saveDraft();
      });

    } catch (err) {
      console.error('Error loading article:', err);
      this.error = 'Failed to load article. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the formChangesSubscription to prevent memory leaks
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }

  private saveDraft() {
    const draft = {
      ...this.form.value,
      selectedTags: this.selectedTags,
      thumbnailUrl: this.avatarUrl,
    };
    localStorage.setItem(this.draftStorageKey, JSON.stringify(draft));
  }

  hasDraft(): boolean {
    return !!localStorage.getItem(this.draftStorageKey);
  }

  discardDraft() {
    localStorage.removeItem(this.draftStorageKey);
    if (this.originalArticle) {
      this.form.patchValue({
        title: this.originalArticle.title,
        briefDescription: this.originalArticle.briefDescription,
        content: this.originalArticle.content,
        isFeatured: this.originalArticle.isFeatured ?? false,
        isPublished: this.originalArticle.isPublished ?? false,
      });
      this.selectedTags = (this.originalArticle.tags || []).map(name => ({ name, type: 'article' }));
      this.avatarUrl = this.originalArticle.thumbnailUrl || null;
      this.form.get('tags')?.setValue(this.selectedTags);
    } else {
      this.form.reset({
        title: '',
        briefDescription: '',
        content: '',
        tags: [],
        isFeatured: false,
        isPublished: false,
      });
      this.selectedTags = [];
      this.avatarUrl = null;
    }
  }

  get title() {
    return this.form.get('title')!;
  }

  get briefDescription() {
    return this.form.get('briefDescription')!;
  }

  get content() {
    return this.form.get('content')!;
  }

  get tags() {
    return this.form.get('tags')!;
  }

  get isPublished() {
    return this.form.get('isPublished')!;
  }

  onContentChanged() {
    const control = this.content;
    control.markAsTouched();
    control.updateValueAndValidity();
  }

  onTagChange(tags: Tag[]) {
    this.selectedTags = tags;
    const tagsControl = this.tags;
    tagsControl.setValue(tags);
    tagsControl.markAsTouched();
    tagsControl.updateValueAndValidity();
  }

  onImageChange(imageUrl: string | null) {
    this.avatarUrl = imageUrl;
  }

  async onSubmit() {
    this.formSubmitted = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const currentUser = this.firebaseService.auth.currentUser;
      if (!currentUser) {
        this.error = 'You must be logged in to create or edit an article.';
        this.loading = false;
        return;
      }

      const formValue = this.form.value;
      const articleData: Partial<Article> = {
        title: formValue.title,
        thumbnailUrl: this.avatarUrl || undefined,
        briefDescription: formValue.briefDescription,
        content: formValue.content,
        tags: formValue.tags.map((tag: Tag) => tag.name),
        isFeatured: formValue.isFeatured,
        updatedAt: new Date(),
      };

      if (formValue.isPublished) {
        articleData.isPublished = true;
        if (!this.originalArticle?.isPublished || !this.originalArticle?.publishDate) {
          articleData.publishDate = new Date();
        } else if (this.isEditMode) {
          articleData.publishDate = this.originalArticle.publishDate;
        }
      } else {
        articleData.isPublished = false;
        articleData.publishDate = null;
      }

      if (this.isEditMode && this.articleId) {
        await this.articleService.update(this.articleId, articleData);
        localStorage.removeItem(this.draftStorageKey);
        this.router.navigate(['/articles', this.articleId]);
      } else {
        const newArticle: Article = {
          ...articleData as Article,
          authorId: currentUser.uid,
          authorName: currentUser.displayName || 'Anonymous',
          publishDate: articleData.publishDate || null,
          isPublished: articleData.isPublished || false,
        };
        const createdId = await this.articleService.create(newArticle);
        localStorage.removeItem(this.draftStorageKey);
        this.router.navigate(['/articles', createdId]);
      }
    } catch (err) {
      console.error(err);
      this.error = 'Failed to save article. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}