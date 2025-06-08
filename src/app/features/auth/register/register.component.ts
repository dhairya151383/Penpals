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

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return {
      passwordMismatch: true
    };
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

  submitted = false;

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

  async onRegister() {
    this.submitted = true;
    this.registerForm.markAllAsTouched();
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      const {
        title, // Destructure title
        firstName,
        lastName,
        email,
        password,
        role
      } = this.registerForm.value;

      // Determine gender based on title
      const gender = title === 'Mr' ? 'male' : 'female';

      const displayName = (firstName.trim() + (lastName ? ' ' + lastName.trim() : '')).trim();
      const username = firstName.trim();
      try {
        // Pass gender to registerWithEmail
        await this.authService.registerWithEmail(email, password, username, role, displayName, gender);
        this.successMessage = 'Registration successful! Redirecting to dashboard...';
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      } catch (error: any) {
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.isLoading = false;
    }
  }

  async signInWithGoogle() {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    try {
      await this.authService.signInWithGoogle();
      this.successMessage = 'Google registration successful! Redirecting to dashboard...';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } catch (error: any) {
      this.errorMessage = error.message || 'Google registration failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
