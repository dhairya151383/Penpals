import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./dashboard.component.html' ,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  //articles$: Observable<Article[]>;

  constructor(
    //private articleService: ArticleService
  ) {
    //this.articles$ = this.articleService.getArticles();
  }

  ngOnInit(): void {
    // You might add pagination logic here
  }

  // onSearch(query: string) {
  //   this.articles$ = this.articleService.searchArticles(query);
  // }
}