import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule, TagSelectorComponent, LoadingSpinnerComponent, UploadImageComponent],
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
    this.initializeForm();

    this.bio.valueChanges.subscribe((value: string) => {
      this.bioCharacterCount = value ? value.length : 0;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authorId = id;
      this.loadAuthorData(id);
    } else {
      this.error = 'Invalid author ID provided.';
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }
  }

  private initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      bio: ['', [Validators.required, Validators.maxLength(this.bioCharacterLimit)]],
      avatarUrl: ['', [
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)(\?.*)?|assets\/images\/.*\.jpg)$/i)
      ]],
      socialLinks: this.fb.group({
        twitter: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}\/?$/i)]],
        linkedin: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/i)]],
        facebook: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.]+\/?$/i)]],
      }),
    });
  }

  private async loadAuthorData(id: string) {
    this.loading = true;
    this.error = null;

    try {
      const author = await this.authorService.getById(id);
      if (author) {
        this.tags = (author.tags || []).map(name => ({ name, type: 'author' }));
        this.avatarUrl = author.avatarUrl || 'assets/images/defaultAvatar.jpg';
        this.form.patchValue({
          name: author.name || '',
          bio: author.bio || '',
          avatarUrl: author.avatarUrl || '',
          socialLinks: {
            twitter: author.socialLinks?.twitter || '',
            linkedin: author.socialLinks?.linkedin || '',
            facebook: author.socialLinks?.facebook || '',
          },
        });
        this.bioCharacterCount = author.bio ? author.bio.length : 0;
        this.form.updateValueAndValidity();
      } else {
        this.error = 'Author not found.';
        this.router.navigate(['/authors']);
      }
    } catch (err) {
      console.error('Failed to load author data:', err);
      this.error = 'Failed to load author data. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  get name(): AbstractControl { return this.form.get('name')!; }
  get bio(): AbstractControl { return this.form.get('bio')!; }
  get avatarUrlControl(): AbstractControl { return this.form.get('avatarUrl')!; }
  get socialLinksGroup(): FormGroup { return this.form.get('socialLinks') as FormGroup; }
  get twitter(): AbstractControl { return this.socialLinksGroup.get('twitter')!; }
  get linkedin(): AbstractControl { return this.socialLinksGroup.get('linkedin')!; }
  get facebook(): AbstractControl { return this.socialLinksGroup.get('facebook')!; }

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
    this.bio.markAsTouched();
  }

  async save() {
    this.formSubmitted = true;
    this.form.markAllAsTouched();

    console.log('Attempting to save - Form valid:', this.form.valid);
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control?.invalid) {
        console.log(`Control '${key}' is invalid. Errors:`, control.errors);
      }
    });
    if (this.socialLinksGroup.invalid) {
      Object.keys(this.socialLinksGroup.controls).forEach(key => {
        const control = this.socialLinksGroup.get(key);
        if (control?.invalid) {
          console.log(`SocialLink control '${key}' is invalid. Errors:`, control.errors);
        }
      });
    }

    if (this.form.invalid) {
      this.error = 'Please correct the highlighted errors before saving.';
      this.loading = false;
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
      this.router.navigate(['/author', this.authorId]);
    } catch (err) {
      console.error('Failed to update author:', err);
      this.error = 'Failed to save changes. An unexpected error occurred.';
    } finally {
      this.loading = false;
    }
  }
}