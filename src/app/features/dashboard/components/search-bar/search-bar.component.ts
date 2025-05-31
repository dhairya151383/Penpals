import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <input
      type="search"
      [(ngModel)]="query"
      (ngModelChange)="onInputChange($event)"
      placeholder="Search articles..."
      class="search-input"
    />
  `,
  styles: [
    `
      .search-input {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border-radius: 4px;
        border: 1px solid #ccc;
      }
    `,
  ],
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  query = '';

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => this.search.emit(value));
  }

  onInputChange(value: string) {
    this.searchSubject.next(value);
  }
}
