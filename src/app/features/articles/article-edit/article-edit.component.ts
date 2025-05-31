import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { Article } from '../../../shared/models/article.model';
import { Author } from '../../../shared/models/author.model';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { Tag } from '../../../shared/models/tag.model';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule, TagSelectorComponent],
})
export class ArticleEditComponent implements OnInit {
  articleId!: string;
  article!: Article;
  author: Author | null = null;
  form!: FormGroup;
  selectedTags: Tag[] = [];
  loading = true;
  error: string | null = null;
  formSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private fb: FormBuilder
  ) {}

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

  async ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    try {
      const article = await this.articleService.getById(this.articleId);
      if (article) {
        this.article = article;
        this.selectedTags = (article.tags || []).map(name => ({ name })); // initialize selected tags

        this.form = this.fb.group({
          title: [article.title, [Validators.required, Validators.minLength(3)]],
          briefDescription: [article.briefDescription, [Validators.required, Validators.minLength(10)]],
          content: [article.content, [Validators.required]],
          isFeatured: [article.isFeatured ?? false]
        });

        this.author = await this.authorService.getById(article.authorId);
      } else {
        this.error = 'Article not found.';
      }
    } catch {
      this.error = 'Failed to load article.';
    } finally {
      this.loading = false;
    }
  }

  onTagChange(tags: Tag[]) {
    this.selectedTags = tags;
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
      this.router.navigate(['/articles', this.articleId]);
    } catch {
      this.error = 'Failed to update article.';
    }
  }
}
