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
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { ArticleService } from '../../../core/services/article.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { Article } from '../../../shared/models/article.model';
import { Tag } from '../../../shared/models/tag.model';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

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
  imports: [CommonModule, ReactiveFormsModule, QuillModule, TagSelectorComponent, LoadingSpinnerComponent],
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;
  selectedTags: Tag[] = [];
  formSubmitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private articleService: ArticleService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    try {
      this.form = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        briefDescription: ['', [Validators.required, Validators.minLength(10)]],
        content: ['', [quillRequired]],
        tags: [[], [minTagsSelected(1)]],
        isFeatured: [false],
      });
    } catch (err) {
      console.error('Error loading article add:', err);
    } finally {
      this.loading = false;
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
        this.error = 'You must be logged in to create an article.';
        this.loading = false;
        return;
      }

      const formValue = this.form.value;
      const newArticle: Article = {
        title: formValue.title,
        briefDescription: formValue.briefDescription,
        content: formValue.content,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous',
        publishDate: new Date(),
        tags: formValue.tags.map((tag: Tag) => tag.name),
        isFeatured: formValue.isFeatured,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdId = await this.articleService.create(newArticle);
      this.router.navigate(['/articles', createdId]);
    } catch (err) {
      console.error(err);
      this.error = 'Failed to create article. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
