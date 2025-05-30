import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
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

  async onLogin() {
    this.isLoading = true;
    this.errorMessage = null;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.signInWithEmail(email, password);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        this.errorMessage = error.message || 'Login failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  async signInWithGoogle() {
    this.isLoading = true;
    this.errorMessage = null;
    try {
      await this.authService.signInWithGoogle();
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Google login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithFacebook() {
    this.isLoading = true;
    this.errorMessage = null;
    // Placeholder for Facebook login logic
    // You would integrate Facebook SDK or Firebase Facebook provider here
    try {
      // await this.authService.signInWithFacebook(); // Example
      console.log('Facebook login initiated (placeholder)');
      this.errorMessage = 'Facebook login is not yet implemented.';
    } catch (error: any) {
      this.errorMessage = error.message || 'Facebook login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}