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
  @Output() selectedTagsChange = new EventEmitter<Tag[]>();

  availableTags: Tag[] = [];
  filteredTags: Tag[] = [];
  newTagName: string = '';

  constructor(private tagService: TagService) {}

  async ngOnInit() {
    this.availableTags = await this.tagService.getAll();
    this.filterTags();
  }

  async addTag() {
    if (!this.newTagName.trim() || this.selectedTags.length >= 10) return;

    const tag = await this.tagService.addTag(this.newTagName.trim());
    if (!this.selectedTags.find(t => t.id === tag.id)) {
      this.selectedTags.push(tag);
      this.selectedTagsChange.emit(this.selectedTags);
    }
    this.newTagName = '';
    this.availableTags = await this.tagService.getAll();
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
    if (!this.selectedTags.find(t => t.id === tag.id) && this.selectedTags.length < 10) {
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
