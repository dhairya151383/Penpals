import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../shared/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-article-details',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
})
export class ArticleDetailsComponent implements OnInit {
  article: Article | null = null;
  author: Author | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authorService: AuthorService
  ) {}

  async ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.article = await this.articleService.getById(id);
    if (this.article?.authorId) {
      this.author = await this.authorService.getById(this.article.authorId);
    }
  }
}
