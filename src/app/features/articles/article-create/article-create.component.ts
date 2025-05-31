import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { ArticleService } from '../../../core/services/article.service';
import { FirebaseService } from '../../../core/services/firebase.service';
import { Article } from '../../../shared/models/article.model';

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './article-create.component.html',
})
export class ArticleCreateComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private articleService: ArticleService,
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      briefDescription: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', Validators.required],
      tags: [''],
      isFeatured: [false],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;

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
        tags: formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()) : [],
        isFeatured: formValue.isFeatured,
        // Add createdAt, updatedAt if your model has these
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
