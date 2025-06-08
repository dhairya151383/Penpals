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
import { catchError, finalize } from 'rxjs/operators'; // Import operators
import { of } from 'rxjs'; // Import 'of' for error handling

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
  avatarUrl: string = 'assets/images/defaultAvatar.jpg'; // Initialize with a default placeholder
  authorId!: string;
  loading = true; // Set to true initially to show spinner while fetching data
  error: string | null = null;
  formSubmitted = false; // Flag to indicate if form has been submitted
  bioCharacterCount: number = 0;
  readonly bioCharacterLimit: number = 1200;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeForm(); // Call a method to initialize form

    // Subscribe to bio value changes for character count
    this.bio.valueChanges.subscribe((value: string) => {
      this.bioCharacterCount = value ? value.length : 0;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authorId = id;
      this.loadAuthorData(id);
    } else {
      // This scenario (editing an author without an ID) implies a new author creation flow
      // or an error in routing. For 'edit' component, an ID should always be present.
      this.error = 'Invalid author ID provided.';
      this.loading = false;
      // Optionally redirect to a list or dashboard if ID is missing
      this.router.navigate(['/dashboard']); // Or '/authors'
    }
  }

  private initializeForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      bio: ['', [Validators.required, Validators.maxLength(this.bioCharacterLimit)]],
      avatarUrl: ['', [
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)(\?.*)?|assets\/images\/.*\.jpg)$/i) // More robust URL pattern
      ]],
      socialLinks: this.fb.group({
        twitter: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{1,15}\/?$/i)]],
        linkedin: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/i)]],
        facebook: ['', [Validators.pattern(/^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.]+\/?$/i)]],
      }),
    });
  }

  private async loadAuthorData(id: string) {
    this.loading = true; // Ensure loading is true
    this.error = null; // Clear previous errors

    try {
      const author = await this.authorService.getById(id);
      if (author) {
        this.tags = (author.tags || []).map(name => ({ name, type: 'author' }));
        this.avatarUrl = author.avatarUrl || 'assets/images/defaultAvatar.jpg'; // Ensure avatarUrl is set for display
        this.form.patchValue({
          name: author.name || '',
          bio: author.bio || '',
          avatarUrl: author.avatarUrl || '', // Patch the actual URL to the form control
          socialLinks: {
            twitter: author.socialLinks?.twitter || '',
            linkedin: author.socialLinks?.linkedin || '',
            facebook: author.socialLinks?.facebook || '',
          },
        });
        this.bioCharacterCount = author.bio ? author.bio.length : 0;
        this.form.updateValueAndValidity(); // Recalculate validation status
      } else {
        this.error = 'Author not found.';
        this.router.navigate(['/authors']); // Or a 404 page
      }
    } catch (err) {
      console.error('Failed to load author data:', err);
      this.error = 'Failed to load author data. Please try again.';
    } finally {
      this.loading = false; // Set loading to false once operation is complete
    }
  }

  // Helper getters for easier template access and type safety
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
    this.avatarUrl = newImageUrl || 'assets/images/defaultAvatar.jpg'; // Update for display
    // Update the form control value directly to trigger its validation
    this.avatarUrlControl.setValue(newImageUrl);
    this.avatarUrlControl.markAsDirty(); // Mark as dirty since user interaction changed it
    this.avatarUrlControl.updateValueAndValidity(); // Ensure validation runs immediately
  }

  // onBioChanged is no longer strictly necessary if using valueChanges for character count
  // and direct form control binding for input. Keeping for explicit touch.
  onBioChanged(event: Event) {
    this.bio.markAsTouched(); // Explicitly mark touched on user input
    // The character count is handled by bio.valueChanges subscription
  }

  async save() {
    this.formSubmitted = true; // Indicate form submission attempt
    this.form.markAllAsTouched(); // Mark all controls as touched to display errors immediately

    // Log current form state for debugging before preventing save
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
      this.loading = false; // Ensure loading is off if form is invalid
      return;
    }

    this.loading = true; // Show loading spinner
    this.error = null; // Clear previous errors

    const updated: Partial<Author> = {
      name: this.form.value.name,
      bio: this.form.value.bio,
      avatarUrl: this.avatarUrl, // Use the this.avatarUrl which comes from UploadImageComponent
      tags: this.tags.map(t => t.name),
      socialLinks: this.form.value.socialLinks,
      updatedAt: new Date().toISOString(), // Ensure updatedAt is set
    };

    try {
      await this.authorService.update(this.authorId, updated);
      this.router.navigate(['/author', this.authorId]); // Navigate back to author details
    } catch (err) {
      console.error('Failed to update author:', err);
      this.error = 'Failed to save changes. An unexpected error occurred.';
    } finally {
      this.loading = false; // Hide loading spinner
    }
  }
}