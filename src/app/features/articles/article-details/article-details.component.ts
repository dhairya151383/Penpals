import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../../shared/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-article-details',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
})
export class ArticleDetailsComponent implements OnInit {
  author: Author | null = null;
  canEdit = false;
  article: Article | null = null;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.author = await this.authorService.getById(id);

    // Optionally fetch an article if needed for the template
    // or remove usage of article if not relevant here

    this.authService.user$.subscribe((user) => {
      const uid = user?.uid ?? null;
      this.canEdit = uid === this.author?.id;
    });
  }
}
