import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ArticleService } from '../../../core/services/article.service';
import { Article } from '../../../shared/models/article.model';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { Tag } from '../../../shared/models/tag.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule, TagSelectorComponent,LoadingSpinnerComponent],
})
export class ArticleEditComponent implements OnInit {
  articleId!: string;
  article!: Article;
  form!: FormGroup;
  selectedTags: Tag[] = [];
  loading = true;
  error: string | null = null;
  formSubmitted = false;
  private readonly draftStorageKey = `article-edit-draft-${this.articleId}`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    try {
      const article = await this.articleService.getById(this.articleId);
      if (article) {
        this.article = article;
        this.selectedTags = (article.tags || []).map(name => ({ name, type: 'article' }));

        // Initialize form either from localStorage draft or from fetched article
        const draft = localStorage.getItem(this.draftStorageKey);
        if (draft) {
          const draftData = JSON.parse(draft);
          this.form = this.fb.group({
            title: [draftData.title, [Validators.required, Validators.minLength(3)]],
            briefDescription: [draftData.briefDescription, [Validators.required, Validators.minLength(10)]],
            content: [draftData.content, [Validators.required]],
            isFeatured: [draftData.isFeatured ?? false]
          });
          this.selectedTags = draftData.selectedTags || this.selectedTags;
        } else {
          this.form = this.fb.group({
            title: [article.title, [Validators.required, Validators.minLength(3)]],
            briefDescription: [article.briefDescription, [Validators.required, Validators.minLength(10)]],
            content: [article.content, [Validators.required]],
            isFeatured: [article.isFeatured ?? false]
          });
        }
        // Subscribe to form changes to save draft on each change
        this.form.valueChanges.subscribe(() => {
          this.saveDraft();
        });
      } else {
        this.error = 'Article not found.';
      }
    } catch {
      this.error = 'Failed to load article.';
    } finally {
      this.loading = false;
    }
  }

  private saveDraft() {
    const draft = {
      ...this.form.value,
      selectedTags: this.selectedTags
    };
    localStorage.setItem(this.draftStorageKey, JSON.stringify(draft));
  }

  hasDraft(): boolean {
    return !!localStorage.getItem(this.draftStorageKey);
  }

  discardDraft() {
    localStorage.removeItem(this.draftStorageKey);
    // Reset form to original article data
    if (this.article) {
      this.form.patchValue({
        title: this.article.title,
        briefDescription: this.article.briefDescription,
        content: this.article.content,
        isFeatured: this.article.isFeatured ?? false
      });
      this.selectedTags = (this.article.tags || []).map(name => ({ name, type: 'article' }));
    }
  }

  async onSubmit() {
    this.formSubmitted = true;
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const formValue = this.form.value;
    const updatedArticle: Partial<Article> = {
      title: formValue.title,
      briefDescription: formValue.briefDescription,
      content: formValue.content,
      tags: this.selectedTags.map(t => t.name),
      isFeatured: formValue.isFeatured,
      updatedAt: new Date()
    };
    try {
      await this.articleService.update(this.articleId, updatedArticle);
      localStorage.removeItem(this.draftStorageKey); // clear draft on successful save
      this.router.navigate(['/articles', this.articleId]);
    } catch {
      this.error = 'Failed to update article.';
    }
  }

  get title(): AbstractControl {
    return this.form.get('title')!;
  }

  get briefDescription(): AbstractControl {
    return this.form.get('briefDescription')!;
  }

  get content(): AbstractControl {
    return this.form.get('content')!;
  }

  get isFeatured(): AbstractControl {
    return this.form.get('isFeatured')!;
  }

  private initForm(article: Article) {
    this.article = article;
    this.selectedTags = (article.tags || []).map(name => ({ name, type: 'article' }));

    this.form = this.fb.group({
      title: [article.title, [Validators.required, Validators.minLength(3)]],
      briefDescription: [article.briefDescription, [Validators.required, Validators.minLength(10)]],
      content: [article.content, [Validators.required]],
      isFeatured: [article.isFeatured ?? false]
    });
  }

  onTagChange(tags: Tag[]) {
    this.selectedTags = tags;
  }
}
