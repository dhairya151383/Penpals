import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { Article } from '../../../shared/models/article.model';
import { Author } from '../../../shared/models/author.model';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],

})
export class ArticleEditComponent implements OnInit {
  articleId!: string;
  article!: Article;
  author: Author | null = null;
  form!: FormGroup;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    try {
      const article = await this.articleService.getById(this.articleId);
      if (article) {
        this.article = article;
        this.form = this.fb.group({
          title: [article.title, [Validators.required, Validators.minLength(3)]],
          briefDescription: [article.briefDescription, [Validators.required, Validators.minLength(10)]],
          content: [article.content, [Validators.required]],
          tags: [article.tags?.join(', ')],
          isFeatured: [article.isFeatured ?? false]
        });

        this.author = await this.authorService.getById(article.authorId);
      } else {
        this.error = 'Article not found.';
      }
    } catch (err) {
      this.error = 'Failed to load article.';
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const updatedArticle: Partial<Article> = {
      title: formValue.title,
      briefDescription: formValue.briefDescription,
      content: formValue.content,
      tags: formValue.tags.split(',').map((t: string) => t.trim()),
      isFeatured: formValue.isFeatured,
      updatedAt: new Date()
    };

    try {
      await this.articleService.update(this.articleId, updatedArticle);
      this.router.navigate(['/articles', this.articleId]);
    } catch (err) {
      this.error = 'Failed to update article.';
    }
  }
}
