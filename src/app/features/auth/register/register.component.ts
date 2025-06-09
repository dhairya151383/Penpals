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

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    if (confirmPassword.touched || confirmPassword.dirty) {
      confirmPassword.setErrors({ passwordMismatch: true });
    }
    return { passwordMismatch: true };
  } else {
    if (confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
  }
  return null;
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        title: ['Mr', Validators.required],
        firstName: ['', Validators.required],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required]
      },
      {
        validators: passwordMatchValidator
      }
    );
  }

  get f() { return this.registerForm.controls; }

  async onRegister() {
    this.registerForm.markAllAsTouched();
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form before submitting.';
      return;
    }

    this.isLoading = true;
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
    const username = firstName.trim();

    try {
      await this.authService.registerWithEmail(email, password, username, role, displayName, gender);
      this.successMessage = 'Registration successful! You will be redirected to the dashboard shortly.';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'This email address is already in use. Please log in or use a different email.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'The email address is badly formatted.';
      } else {
        this.errorMessage = error.message || 'Registration failed. An unexpected error occurred. Please try again.';
      }
      console.error('Registration error:', error);
    } finally {
      this.isLoading = false;
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