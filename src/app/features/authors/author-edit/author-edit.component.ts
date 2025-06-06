import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../../core/services/author.service';
import { Author } from '../../../shared/models/author.model';
import { Tag } from '../../../shared/models/tag.model';
import { TagSelectorComponent } from '../../../shared/components/tag-selector/tag-selector.component';
import { QuillModule } from 'ngx-quill';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { UploadImageComponent } from '../../../shared/components/upload-image/upload-image.component';

/**
 * Custom validator for Quill editor to ensure the bio field is not empty
 * when its content is stripped of HTML and trimmed.
 * @param control The AbstractControl of the form field.
 * @returns ValidationErrors | null
 */
export function quillRequired(control: AbstractControl): ValidationErrors | null {
  const value = control.value || '';
  // Strip HTML tags to get plain text length for validation
  const text = value.replace(/<[^>]*>/g, '').trim();
  return text.length === 0 ? { required: true } : null;
}

/**
 * Custom validator for Quill editor to enforce a maximum plain text length.
 * This is crucial because Angular's default Validators.maxLength operates on the raw HTML string,
 * which can be much longer than the visible text due to formatting tags.
 * @param maxLength The maximum allowed plain text length.
 * @returns A validator function.
 */
export function quillPlainTextMaxLength(maxLength: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    // Use a temporary div to get plain text content accurately, handling potential HTML structure
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value;
    let text = tempDiv.textContent || tempDiv.innerText || '';

    // Special handling for Quill's behavior: an empty editor often returns just a newline.
    // If the text is purely whitespace or a single newline, consider it empty for length calculation.
    if (text.trim().length === 0) {
      text = ''; // Treat as empty
    } else if (text.endsWith('\n') && text.length > 0) {
      // If it ends with a newline and is not just a newline, remove it for the count.
      // This accounts for Quill's default trailing newline.
      text = text.slice(0, -1);
    }
    
    return text.length > maxLength ? { 'quillPlainTextMaxLength': { requiredLength: maxLength, actualLength: text.length } } : null;
  };
}


@Component({
  selector: 'app-author-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TagSelectorComponent, QuillModule, LoadingSpinnerComponent, UploadImageComponent],
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  form!: FormGroup;
  tags: Tag[] = [];
  avatarUrl: string = 'assets/avatar-placeholder.png';
  authorId!: string;
  loading = true;
  error: string | null = null;
  formSubmitted = false;

  bioCharacterCount: number = 0; // Property to track current plain text character count of the bio
  readonly bioCharacterLimit: number = 2000; // Define the character limit for the bio

  // Quill editor configuration to restrict content (no images, videos)
  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons for text formatting
      ['blockquote'],                                   // blockquote

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values for headers
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // ordered and unordered lists
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown for font sizes
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],        // custom dropdown for header levels

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults for text color and background
      [{ 'font': [] }],                                 // font family dropdown
      [{ 'align': [] }],                                // text alignment

      ['clean']                                         // remove formatting button
      // Image and video buttons are deliberately omitted here to restrict content
    ]
  };


  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Initialize the form with validators
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      // Apply custom plain text max length validator for bio
      bio: ['', [quillRequired, quillPlainTextMaxLength(this.bioCharacterLimit)]],
      // Avatar URL validation for image file extensions
      avatarUrl: ['', [Validators.pattern(/\.(jpeg|jpg|gif|png|webp)$/)]],
      socialLinks: this.fb.group({
        // Pattern validators for social media URLs
        twitter: ['', [Validators.pattern(/^https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+$/)]],
        linkedin: ['', [Validators.pattern(/^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/)]],
        facebook: ['', [Validators.pattern(/^https:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.]+$/)]],
      }),
    });

    // Debugging: Subscribe to form value changes to monitor its status and errors
    this.form.valueChanges.subscribe(() => {
      console.log('--- Form Status Update ---');
      console.log('Form status:', this.form.status); // VALID, INVALID, PENDING, DISABLED
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


    // Get author ID from route parameters
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authorService.getById(id).then(author => {
        if (author) {
          this.authorId = id;
          this.tags = (author.tags || []).map(name => ({ name, type: 'author' }));
          this.avatarUrl = author.avatarUrl || this.avatarUrl; // Update local avatarUrl for display

          // Patch form values with retrieved author data
          this.form.patchValue({
            name: author.name || '',
            bio: author.bio || '',
            socialLinks: {
              twitter: author.socialLinks?.twitter || '',
              linkedin: author.socialLinks?.linkedin || '',
              facebook: author.socialLinks?.facebook || '',
            },
          });
          // Explicitly set the avatarUrl form control value
          this.form.get('avatarUrl')?.setValue(author.avatarUrl || '');

          // Initialize bioCharacterCount after patching bio content
          if (author.bio) {
            this.bioCharacterCount = this.getPlainTextLength(author.bio);
          }

          // Force form validation after patching to ensure initial state is correct
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

  // Getters for easier access to form controls and their validation states in the template
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

  /**
   * Handles changes from the TagSelectorComponent.
   * @param tags The updated array of selected tags.
   */
  onTagChange(tags: Tag[]) {
    this.tags = tags;
  }

  /**
   * Handles image URL changes from the UploadImageComponent.
   * Updates the local avatarUrl property and the form control.
   * @param newImageUrl The new image URL or null.
   */
  onImageChange(newImageUrl: string | null) {
    this.avatarUrl = newImageUrl || 'assets/avatar-placeholder.png';
    // Update the form control and trigger its validation
    this.avatarUrlControl.setValue(newImageUrl);
    this.avatarUrlControl.markAsDirty(); // Mark as dirty to trigger validation messages
    this.avatarUrlControl.updateValueAndValidity(); // Re-run validation for this control
  }

  /**
   * Helper function to extract plain text length from HTML content,
   * by stripping HTML tags and trimming whitespace, and handling Quill's specific newlines.
   * @param html The HTML string.
   * @returns The plain text length.
   */
  private getPlainTextLength(html: string): number {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || '';

    // Handle Quill's common behavior where an empty editor or single line returns a trailing newline.
    // If the text is purely whitespace (including newlines), treat it as 0 length.
    if (text.trim().length === 0) {
      return 0;
    }

    // If the text has content and ends with a newline, remove that newline for the count,
    // as it's often not considered a "character" by the user.
    if (text.length > 0 && text.endsWith('\n')) {
      text = text.slice(0, -1);
    }

    return text.length;
  }

  /**
   * Handles content changes in the Quill editor for the bio field.
   * Updates the character count and triggers re-validation of the bio control.
   * @param event The Quill editor content change event.
   */
  onBioChanged(event: any) {
    const control = this.bio;
    // Mark as touched on change to ensure validation messages appear after interaction
    control.markAsTouched();

    // Get the plain text from the Quill editor's current state
    const currentText = event.editor.getText();
    this.bioCharacterCount = this.getPlainTextLength(currentText);

    // Explicitly re-evaluate validators for the bio control.
    // This is critical for the `quillPlainTextMaxLength` validator to update the form's validity
    // and thus enable/disable the save button correctly when characters are added or removed.
    control.updateValueAndValidity();
    console.log('Bio changed - Bio control errors after update:', this.bio.errors);
    console.log('Bio changed - Form status after update:', this.form.status);
  }

  /**
   * Saves the author data after form submission.
   * Marks all controls as touched and checks form validity before proceeding.
   */
  async save() {
    this.formSubmitted = true; // Set flag to true to show all validation errors
    this.form.markAllAsTouched(); // Mark all controls as touched to trigger validation messages

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
      return; // Prevent saving if the form is invalid
    }

    this.loading = true;
    this.error = null;

    // Construct the updated author object from form values
    const updated: Partial<Author> = {
      name: this.form.value.name,
      bio: this.form.value.bio, // This will be the HTML content from Quill
      avatarUrl: this.avatarUrl, // Use the local avatarUrl property (updated by upload component)
      tags: this.tags.map(t => t.name), // Extract tag names
      socialLinks: this.form.value.socialLinks,
      updatedAt: new Date().toISOString(),
    };

    try {
      await this.authorService.update(this.authorId, updated);
      console.log('Author updated successfully. Navigating...');
      this.router.navigate(['/authors', this.authorId]); // Navigate to author details page
    } catch (err) {
      console.error('Failed to update author:', err);
      this.error = 'Failed to save changes. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
