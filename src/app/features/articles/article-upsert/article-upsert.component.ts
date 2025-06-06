import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { ArticleService } from '../../../core/services/article.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { Article } from '../../../shared/models/article.model';
import { Tag } from '../../../shared/models/tag.model';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { UploadImageComponent } from '../../../shared/components/upload-image/upload-image.component'; // Import the upload image component

export function quillRequired(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  const text = value.replace(/<[^>]*>/g, '').trim();
  return text.length === 0 ? { required: true } : null;
}

// Custom validator to require at least `min` tags selected
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
export class ArticleUpsertComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;
  selectedTags: Tag[] = [];
  formSubmitted = false;
  loading = true;
  avatarUrl: string | null = null; // For the thumbnail image
  articleId: string | null = null; // To store article ID in edit mode
  isEditMode = false; // Flag to determine if we are in edit mode
  originalArticle: Article | null = null; // Store original article for comparison/reset

  private readonly draftStorageKeyPrefix = 'article-upsert-draft-';
  private draftStorageKey!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private articleService: ArticleService,
    private firebaseService: FirebaseService
  ) {}

  async ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.articleId; // Set edit mode flag

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

          // Try to load draft
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
            // No draft, populate from fetched article
            this.form.patchValue({
              title: article.title,
              briefDescription: article.briefDescription,
              content: article.content,
              isFeatured: article.isFeatured ?? false,
              isPublished: article.isPublished ?? false,
            });
          }
          // Set tags separately as setValue is not ideal for form controls bound to arrays
          this.form.get('tags')?.setValue(this.selectedTags);

        } else {
          this.error = 'Article not found.';
          this.loading = false;
          return;
        }
      }

      // Subscribe to form changes to save draft
      this.form.valueChanges.subscribe(() => {
        this.saveDraft();
      });

    } catch (err) {
      console.error('Error loading article:', err);
      this.error = 'Failed to load article. Please try again.';
    } finally {
      this.loading = false;
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
        // If it's a new article and we discard draft, reset the form completely
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

  // Getters for easier template access
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
        // Only set publishDate if it's being published for the first time or explicitly set
        if (!this.originalArticle?.isPublished || !this.originalArticle?.publishDate) {
          articleData.publishDate = new Date();
        } else if (this.isEditMode) {
          // In edit mode, if already published, retain original publish date unless explicitly changing
          articleData.publishDate = this.originalArticle.publishDate;
        }
      } else {
        articleData.isPublished = false;
        articleData.publishDate = null;
      }


      if (this.isEditMode && this.articleId) {
        // Update existing article
        await this.articleService.update(this.articleId, articleData);
        localStorage.removeItem(this.draftStorageKey); // clear draft on successful save
        this.router.navigate(['/articles', this.articleId]);
      } else {
        // Create new article
        const newArticle: Article = {
          ...articleData as Article, // Cast to Article as it's a new creation
          authorId: currentUser.uid,
          authorName: currentUser.displayName || 'Anonymous',
          publishDate: articleData.publishDate || null, // Ensure publishDate is handled for new article
          isPublished: articleData.isPublished || false, // Ensure isPublished is handled for new article
        };
        const createdId = await this.articleService.create(newArticle);
        localStorage.removeItem(this.draftStorageKey); // clear draft on successful save
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