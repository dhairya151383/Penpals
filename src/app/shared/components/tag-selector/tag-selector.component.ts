import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagService } from '../../../core/services/tag.service';
import { Tag } from '../../../shared/models/tag.model';

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit {
  @Input() selectedTags: Tag[] = [];
  @Input() tagType: 'author' | 'article' = 'article';
  @Input() filterOnly = false;
  @Output() selectedTagsChange = new EventEmitter<Tag[]>();

  availableTags: Tag[] = [];
  filteredTags: Tag[] = [];
  newTagName: string = '';

  constructor(private tagService: TagService) { }

  async ngOnInit() {
    this.availableTags = await this.tagService.getAll(this.tagType);
    this.filterTags();

  }

  async addTag() {
    const trimmedName = this.newTagName.trim();
    if (this.filterOnly || !trimmedName || this.selectedTags.length >= 5) return;
    if (trimmedName.length > 15) {
      alert('Tag name cannot exceed 15 characters.');
      return;
    }
    const tag = await this.tagService.addTag(trimmedName, this.tagType);
    if (!this.selectedTags.find(t => t.id === tag.id)) {
      this.selectedTags.push(tag);
      this.selectedTagsChange.emit(this.selectedTags);
    }
    this.newTagName = '';
    this.availableTags = await this.tagService.getAll(this.tagType);
    this.filterTags();
  }

  filterTags() {
    const search = this.newTagName.trim().toLowerCase();
    this.filteredTags = search
      ? this.availableTags
        .filter(tag =>
          tag.name.toLowerCase().includes(search) &&
          !this.selectedTags.some(t => t.id === tag.id))
      : [];
  }

  selectTag(tag: Tag) {
    if (!this.selectedTags.find(t => t.id === tag.id) && this.selectedTags.length < 5) {
      this.selectedTags.push(tag);
      this.selectedTagsChange.emit(this.selectedTags);
    }
    this.newTagName = '';
    this.filterTags();
  }

  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id);
    this.selectedTagsChange.emit(this.selectedTags);
    this.filterTags();
  }
}
