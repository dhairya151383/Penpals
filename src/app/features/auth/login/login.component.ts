import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,LoadingSpinnerComponent],
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

    if (!this.loginForm.valid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.signInWithEmail(email, password);
      await this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Login failed. Please try again.';
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
      this.errorMessage = error.message || 'Google login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  // async signInWithFacebook(): Promise<void> {
  //   this.isLoading = true;
  //   this.errorMessage = null;

  //   try {
  //     // Placeholder - implement actual Facebook login
  //     console.warn('Facebook login initiated (placeholder)');
  //     this.errorMessage = 'Facebook login is not yet implemented.';
  //   } catch (error: any) {
  //     this.errorMessage = error.message || 'Facebook login failed. Please try again.';
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }
}
