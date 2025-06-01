import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { Article } from '../../../shared/models/article.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {
  author: Author | null = null;
  canEdit = false;      // add this
  article: Article | null = null;  // add this if you use 'article' in template

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.author = await this.authorService.getById(id);

    // If you want to fetch article or set article property, do so here
    // For example, you could fetch the article based on route or authorId if relevant
    // Otherwise remove article references from template if unused

    this.authService.user$.subscribe(user => {
      const uid = user?.uid ?? null;
      this.canEdit = uid === this.author?.id;
    });
  }
}

