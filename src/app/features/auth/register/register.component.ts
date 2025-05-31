// src/app/features/auth/register/register.component.ts (UPDATED)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

// Custom validator for password matching
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
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
  isLoading: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    }, { validators: passwordMatchValidator });
  }

  async onRegister() {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      const { firstName, lastName, email, password, role } = this.registerForm.value;
      // Trim and build displayName
      const displayName = (firstName.trim() + (lastName ? ' ' + lastName.trim() : '')).trim();
      // username is firstName only
      const username = firstName.trim();
      try {
        // Pass displayName and username separately if needed by your authService
        await this.authService.registerWithEmail(email, password, username, role, displayName);
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
      this.isLoading = false;
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.registerForm.markAllAsTouched();
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

  async signInWithFacebook() {
    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;
    // Placeholder for Facebook registration logic
    try {
      // await this.authService.signInWithFacebook(); // Example
      console.log('Facebook registration initiated (placeholder)');
      this.errorMessage = 'Facebook registration is not yet implemented.';
    } catch (error: any) {
      this.errorMessage = error.message || 'Facebook registration failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}