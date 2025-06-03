import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { Tag } from '../../../shared/models/tag.model';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-author-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TagSelectorComponent, QuillModule],
  templateUrl: './author-edit.component.html',
})
export class AuthorEditComponent implements OnInit {
  form!: FormGroup;
  tags: Tag[] = [];
  avatarUrl: string = 'assets/avatar-placeholder.png';
  authorId!: string;
  loading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      website: [''],
      bio: ['', Validators.required],
      socialLinks: this.fb.group({
        twitter: [''],
        linkedin: [''],
        facebook: [''],
      }),
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authorService.getById(id).then(author => {
        if (author) {
          this.authorId = id;
          this.tags = (author.tags || []).map(name => ({ name, type: 'author' }));
          this.avatarUrl = author.avatarUrl || this.avatarUrl;

          this.form.patchValue({
            name: author.name || '',
            website: author.website || '',
            bio: author.bio || '',
            socialLinks: {
              twitter: author.socialLinks?.twitter || '',
              linkedin: author.socialLinks?.linkedin || '',
              facebook: author.socialLinks?.facebook || '',
            },
          });
        } else {
          this.error = 'Author not found.';
        }
      }).catch(err => {
        console.error(err);
        this.error = 'Failed to load author data.';
      }).finally(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
  onTagChange(tags: Tag[]) {
    this.tags = tags;
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async save() {
    if (this.form.invalid) return;

    const updated: Author = {
      id: this.authorId,
      ...this.form.value,
      avatarUrl: this.avatarUrl,
      tags: this.tags.map(t => t.name),
      updatedAt: new Date().toISOString(),
    };
    this.router.navigate(['/authors', this.authorId]);
  }
}
