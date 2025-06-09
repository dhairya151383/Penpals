import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin(): Promise<void> {
    this.errorMessage = null;

    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) {
      this.errorMessage = 'Please enter valid email and password.';
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.signInWithEmail(email, password);
      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        this.errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'The email address is badly formatted.';
      } else if (error.code === 'auth/too-many-requests') {
        this.errorMessage = 'Too many failed login attempts. Please try again later.';
      } else {
        this.errorMessage = error.message || 'Login failed. An unexpected error occurred.';
      }
      console.error('Email/Password Login Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;

    try {
      await this.authService.signInWithGoogle();
      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        this.errorMessage = 'Google login was cancelled.';
      } else if (error.code === 'auth/cancelled-popup-request') {
        this.errorMessage = 'Another login popup was already open. Please try again.';
      } else {
        this.errorMessage = error.message || 'Google login failed. An unexpected error occurred.';
      }
      console.error('Google Sign-in Error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}