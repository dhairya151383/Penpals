import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

// Custom validator for password matching
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Return null if controls aren't initialized yet or values are null/undefined
  if (!password || !confirmPassword) {
    return null;
  }

  // Set error on confirmPassword control directly, but only if it's touched/dirty
  if (password.value !== confirmPassword.value) {
    // Only set error on confirmPassword if values are present to avoid initial error
    if (confirmPassword.touched || confirmPassword.dirty) {
      confirmPassword.setErrors({ passwordMismatch: true });
    }
    return { passwordMismatch: true }; // This error is for the form group
  } else {
    // Clear the error if they match, crucial when user corrects input
    if (confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
  }
  return null; // Passwords match
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // `submitted` flag can be removed if relying on `markAllAsTouched` and `touched` for initial validation display

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        title: ['Mr', Validators.required], // Add title with default 'Mr' and required
        firstName: ['', Validators.required],
        lastName: [''], // lastName is optional, so no Validators.required here
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required] // Role is required
      },
      {
        validators: passwordMatchValidator // Apply custom validator at the form group level
      }
    );
  }

  // Helper getter for easier template access to form controls
  get f() { return this.registerForm.controls; }

  async onRegister() {
    // No need for `this.submitted = true;` if using `markAllAsTouched()`
    this.registerForm.markAllAsTouched(); // Show validation errors on all fields immediately
    this.errorMessage = null; // Clear previous errors
    this.successMessage = null; // Clear previous success messages

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form before submitting.';
      return; // Stop if form is invalid
    }

    this.isLoading = true; // Start loading spinner
    const {
      title,
      firstName,
      lastName,
      email,
      password,
      role
    } = this.registerForm.value;

    const gender = title === 'Mr' ? 'male' : 'female';
    const displayName = (firstName.trim() + (lastName ? ' ' + lastName.trim() : '')).trim();
    // It seems 'username' here is essentially 'firstName', confirm if this is the desired behavior
    const username = firstName.trim(); // Renamed from original for clarity, confirm if this is needed or displayName is enough

    try {
      await this.authService.registerWithEmail(email, password, username, role, displayName, gender);
      this.successMessage = 'Registration successful! You will be redirected to the dashboard shortly.';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000); // Redirect after 2 seconds to allow user to read success message
    } catch (error: any) {
      // Provide more specific error messages for common Firebase auth issues
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'This email address is already in use. Please log in or use a different email.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'The email address is badly formatted.';
      } else {
        this.errorMessage = error.message || 'Registration failed. An unexpected error occurred. Please try again.';
      }
      console.error('Registration error:', error); // Log the detailed error for debugging
    } finally {
      this.isLoading = false; // Stop loading spinner
    }
  }

  async signInWithGoogle() {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    try {
      await this.authService.signInWithGoogle();
      this.successMessage = 'Google registration successful! You will be redirected to the dashboard shortly.';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        this.errorMessage = 'Google sign-in was cancelled by the user.';
      } else {
        this.errorMessage = error.message || 'Google registration failed. An unexpected error occurred. Please try again.';
      }
      console.error('Google sign-in error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
