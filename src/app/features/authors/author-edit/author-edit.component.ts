// src/app/features/authors/author-edit/author-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { Tag } from '../../../shared/models/tag.model';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { UploadImageComponent } from '../../../shared/components/upload-image/upload-image.component';

@Component({
  selector: 'app-author-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TagSelectorComponent, LoadingSpinnerComponent, UploadImageComponent], // QuillModule removed
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  form!: FormGroup;
  tags: Tag[] = [];
  avatarUrl: string = 'assets/images/defaultAvatar.jpg';
  authorId!: string;
  loading = true;
  error: string | null = null;
  formSubmitted = false;
  bioCharacterCount: number = 0;
  readonly bioCharacterLimit: number = 1200;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      bio: ['', [Validators.required, Validators.maxLength(this.bioCharacterLimit)]], // Updated validators for textarea
      avatarUrl: ['', [Validators.pattern(/\.(jpeg|jpg|gif|png|webp)$/)]],
      socialLinks: this.fb.group({
        twitter: ['', [Validators.pattern(/^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+$/)]],
        linkedin: ['', [Validators.pattern(/^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/)]],
        facebook: ['', [Validators.pattern(/^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.]+$/)]],
      }),
    });

    this.form.valueChanges.subscribe(() => {
      console.log('--- Form Status Update ---');
      console.log('Form status:', this.form.status);
      console.log('Form valid:', this.form.valid);
      console.log('Form errors (top-level):', this.form.errors);
      console.log('Bio control errors:', this.bio.errors);
      console.log('Name control errors:', this.name.errors);
      console.log('Avatar URL control errors:', this.avatarUrlControl.errors);
      console.log('Twitter control errors:', this.twitter.errors);
      console.log('LinkedIn control errors:', this.linkedin.errors);
      console.log('Facebook control errors:', this.facebook.errors);
      console.log('--------------------------');
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
            bio: author.bio || '',
            socialLinks: {
              twitter: author.socialLinks?.twitter || '',
              linkedin: author.socialLinks?.linkedin || '',
              facebook: author.socialLinks?.facebook || '',
            },
          });
          this.form.get('avatarUrl')?.setValue(author.avatarUrl || '');
          if (author.bio) {
            this.bioCharacterCount = author.bio.length; // Directly get length for textarea
          }
          this.form.updateValueAndValidity();
          console.log('Form status after patchValue:', this.form.status);
        } else {
          this.error = 'Author not found.';
        }
      }).catch(err => {
        console.error('Failed to load author data:', err);
        this.error = 'Failed to load author data.';
      }).finally(() => {
        this.loading = false;
        console.log('Form status after loading done:', this.form.status);
      });
    } else {
      this.loading = false;
      console.log('Form status for new author (no ID):', this.form.status);
    }
  }

  get name() {
    return this.form.get('name')!;
  }

  get bio() {
    return this.form.get('bio')!;
  }

  get avatarUrlControl() {
    return this.form.get('avatarUrl')!;
  }

  get twitter() {
    return this.form.get('socialLinks.twitter')!;
  }

  get linkedin() {
    return this.form.get('socialLinks.linkedin')!;
  }

  get facebook() {
    return this.form.get('socialLinks.facebook')!;
  }

  onTagChange(tags: Tag[]) {
    this.tags = tags;
  }

  onImageChange(newImageUrl: string | null) {
    this.avatarUrl = newImageUrl || 'assets/images/defaultAvatar.jpg';
    this.avatarUrlControl.setValue(newImageUrl);
    this.avatarUrlControl.markAsDirty();
    this.avatarUrlControl.updateValueAndValidity();
  }

  onBioChanged(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    const control = this.bio;
    control.markAsTouched();
    this.bioCharacterCount = textarea.value.length;
    control.updateValueAndValidity();
    console.log('Bio changed - Bio control errors after update:', this.bio.errors);
    console.log('Bio changed - Form status after update:', this.form.status);
  }

  async save() {
    this.formSubmitted = true;
    this.form.markAllAsTouched();
    console.log('Attempting to save - Form status:', this.form.status);
    console.log('Attempting to save - Form valid:', this.form.valid);
    console.log('Attempting to save - Bio control errors:', this.bio.errors);
    console.log('Attempting to save - Name control errors:', this.name.errors);
    console.log('Attempting to save - Avatar URL control errors:', this.avatarUrlControl.errors);
    console.log('Attempting to save - Twitter control errors:', this.twitter.errors);
    console.log('Attempting to save - LinkedIn control errors:', this.linkedin.errors);
    console.log('Attempting to save - Facebook control errors:', this.facebook.errors);

    if (this.form.invalid) {
      console.log('Form is invalid, preventing save.');
      return;
    }

    this.loading = true;
    this.error = null;

    const updated: Partial<Author> = {
      name: this.form.value.name,
      bio: this.form.value.bio,
      avatarUrl: this.avatarUrl,
      tags: this.tags.map(t => t.name),
      socialLinks: this.form.value.socialLinks,
      updatedAt: new Date().toISOString(),
    };

    try {
      await this.authorService.update(this.authorId, updated);
      console.log('Author updated successfully. Navigating...');
      this.router.navigate(['/author', this.authorId]);
    } catch (err) {
      console.error('Failed to update author:', err);
      this.error = 'Failed to save changes. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
