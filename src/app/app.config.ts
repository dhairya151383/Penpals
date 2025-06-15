import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink for its type, not its implementation here
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Directive, Input, Component } from '@angular/core'; // Added Component for clarity, Directive and Input for MockRouterLinkDirective

import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { RegisterComponent, passwordMatchValidator } from './features/auth/register/register.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

// --- Mock RouterLink Directive ---
// This class acts as a complete replacement for the actual Angular RouterLink directive
// during testing. By providing this mock, Angular's TestBed will use it instead of
// the real RouterLink whenever it encounters `routerLink` in a template.
// This effectively bypasses the complex internal dependencies of the real RouterLink
// on ActivatedRoute, which are often difficult to mock perfectly.
@Directive({
  selector: '[routerLink]', // Matches the selector of the real RouterLink directive
  standalone: true, // Essential for standalone components
})
class MockRouterLinkDirective {
  // Mock the input properties that the real RouterLink might receive.
  @Input() routerLink: any;
  @Input() queryParams: any;
  @Input() routerLinkActive: any;

  // Constructor can be empty or used to spy on interactions if needed,
  // but for basic rendering tests, it's not strictly necessary to do anything here.
  constructor(private router: Router) {} // Inject Router if you want to spy on its navigate method on link click
}
// --- End Mock RouterLink Directive ---


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: any;
  let mockRouter: any;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    // Mock AuthService methods
    mockAuthService = {
      registerWithEmail: jest.fn(),
      signInWithGoogle: jest.fn(),
    };

    // Mock Router methods
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RegisterComponent, // Standalone component under test
        LoadingSpinnerComponent, // Any other standalone components used in RegisterComponent's template
        MockRouterLinkDirective // IMPORT THE MOCK DIRECTIVE HERE INSTEAD OF RouterTestingModule
      ],
      providers: [
        FormBuilder, // Provide FormBuilder
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        // IMPORTANT: We explicitly DO NOT provide ActivatedRoute here.
        // By replacing RouterLink with MockRouterLinkDirective, we bypass
        // the need for RouterLink to inject or interact with ActivatedRoute.
        // The real RouterLink's complex ActivatedRoute dependencies are avoided.
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges(); // Initialize the component and form
  });

  // Global afterEach for clearing mocks. Timers are handled in specific describe blocks.
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the register form with correct controls and validators', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.get('title')).toBeDefined();
    expect(component.registerForm.get('firstName')).toBeDefined();
    expect(component.registerForm.get('lastName')).toBeDefined();
    expect(component.registerForm.get('email')).toBeDefined();
    expect(component.registerForm.get('password')).toBeDefined();
    expect(component.registerForm.get('confirmPassword')).toBeDefined();
    expect(component.registerForm.get('role')).toBeDefined();

    // Check initial values
    expect(component.registerForm.get('title')?.value).toBe('Mr');
    expect(component.registerForm.get('lastName')?.value).toBe(''); // Optional field

    // Check validators
    expect(component.registerForm.get('title')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.registerForm.get('firstName')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.registerForm.get('email')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.registerForm.get('email')?.hasValidator(Validators.email)).toBeTruthy();
    expect(component.registerForm.get('password')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.registerForm.get('password')?.hasValidator(Validators.minLength(6))).toBeTruthy();
    expect(component.registerForm.get('confirmPassword')?.hasValidator(Validators.required)).toBeTruthy();
    expect(component.registerForm.get('role')?.hasValidator(Validators.required)).toBeTruthy();

    // Check passwordMatchValidator is applied at the form group level
    expect(component.registerForm.validator).toBe(passwordMatchValidator);
  });

  describe('passwordMatchValidator', () => {
    let form: FormGroup;

    beforeEach(() => {
      form = formBuilder.group({
        password: [''],
        confirmPassword: ['']
      });
    });

    it('should return null if passwords match', () => {
      form.get('password')?.setValue('password123');
      form.get('confirmPassword')?.setValue('password123');
      expect(passwordMatchValidator(form)).toBeNull();
      expect(form.get('confirmPassword')?.hasError('passwordMismatch')).toBeFalsy();
    });

    it('should return { passwordMismatch: true } if passwords do not match', () => {
      form.get('password')?.setValue('password123');
      form.get('confirmPassword')?.setValue('different');
      form.get('confirmPassword')?.markAsTouched(); // Mark as touched to set error on control
      const errors = passwordMatchValidator(form);
      expect(errors).toEqual({ passwordMismatch: true });
      expect(form.get('confirmPassword')?.hasError('passwordMismatch')).toBeTruthy();
    });

    it('should return null if controls are not present', () => {
      const incompleteForm = formBuilder.group({ password: ['test'] });
      expect(passwordMatchValidator(incompleteForm)).toBeNull();
    });

    it('should clear passwordMismatch error when passwords become matching', () => {
      form.get('password')?.setValue('password123');
      form.get('confirmPassword')?.setValue('different');
      form.get('confirmPassword')?.markAsTouched(); // Trigger error initially
      passwordMatchValidator(form); // Apply validator to set error

      expect(form.get('confirmPassword')?.hasError('passwordMismatch')).toBeTruthy();

      form.get('confirmPassword')?.setValue('password123');
      passwordMatchValidator(form); // Re-apply validator after change
      expect(form.get('confirmPassword')?.hasError('passwordMismatch')).toBeFalsy();
    });
  });

  describe('onRegister', () => {
    // Enable fake timers for tests involving setTimeout
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      // It's important to run any pending timers before restoring real timers
      // to avoid warnings/errors about unhandled timers.
      jest.runOnlyPendingTimers();
      jest.useRealTimers(); // Restore real timers
    });

    it('should set error message and not call authService if form is invalid', async () => {
      // Form is invalid due to empty required fields initially
      component.registerForm.markAllAsTouched();
      await component.onRegister();

      expect(component.errorMessage).toBe('Please fix the errors in the form before submitting.');
      expect(component.isLoading).toBe(false);
      expect(mockAuthService.registerWithEmail).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should call authService.registerWithEmail and navigate on successful registration', fakeAsync(async () => {
      // Set valid form values
      component.registerForm.setValue({
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'user'
      });

      mockAuthService.registerWithEmail.mockResolvedValueOnce({}); // Simulate successful registration

      await component.onRegister();

      expect(component.isLoading).toBe(true);
      tick();
      expect(mockAuthService.registerWithEmail).toHaveBeenCalledWith(
        'john.doe@example.com',
        'Password123',
        'John',
        'user',
        'John Doe',
        'male'
      );
      expect(component.successMessage).toBe('Registration successful! You will be redirected to the dashboard shortly.');
      expect(component.errorMessage).toBeNull();
      expect(component.isLoading).toBe(false);

      tick(2000);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    }));

    it('should handle registration error: email-already-in-use', fakeAsync(async () => {
      component.registerForm.setValue({
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'user'
      });

      mockAuthService.registerWithEmail.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });

      await component.onRegister();
      tick();

      expect(component.isLoading).toBe(false);
      expect(component.errorMessage).toBe('This email address is already in use. Please log in or use a different email.');
      expect(component.successMessage).toBeNull();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));

    it('should handle registration error: weak-password', fakeAsync(async () => {
      component.registerForm.setValue({
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'weak',
        confirmPassword: 'weak',
        role: 'user'
      });
      component.registerForm.get('password')?.setErrors(null);
      passwordMatchValidator(component.registerForm);

      mockAuthService.registerWithEmail.mockRejectedValueOnce({ code: 'auth/weak-password' });

      await component.onRegister();
      tick();

      expect(component.isLoading).toBe(false);
      expect(component.errorMessage).toBe('Password is too weak. Please choose a stronger password.');
      expect(component.successMessage).toBeNull();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));

    it('should handle registration error: invalid-email', fakeAsync(async () => {
      component.registerForm.setValue({
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'user'
      });
      component.registerForm.get('email')?.setErrors(null);
      passwordMatchValidator(component.registerForm);

      mockAuthService.registerWithEmail.mockRejectedValueOnce({ code: 'auth/invalid-email' });

      await component.onRegister();
      tick();

      expect(component.isLoading).toBe(false);
      expect(component.errorMessage).toBe('The email address is badly formatted.');
      expect(component.successMessage).toBeNull();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));


    it('should handle generic registration error', fakeAsync(async () => {
      component.registerForm.setValue({
        title: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'user'
      });

      mockAuthService.registerWithEmail.mockRejectedValueOnce(new Error('Unknown error'));

      await component.onRegister();
      tick();

      expect(component.isLoading).toBe(false);
      expect(component.errorMessage).toBe('Registration failed. An unexpected error occurred. Please try again.');
      expect(component.successMessage).toBeNull();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));

    it('should correctly determine gender and displayName from form values', fakeAsync(async () => {
      component.registerForm.setValue({
        title: 'Ms',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'author'
      });

      mockAuthService.registerWithEmail.mockResolvedValueOnce({});

      await component.onRegister();
      tick();

      expect(mockAuthService.registerWithEmail).toHaveBeenCalledWith(
        'jane.smith@example.com',
        'Password123',
        'Jane',
        'author',
        'Jane Smith',
        'female'
      );
      tick(2000);
    }));

    it('should handle missing lastName in displayName', fakeAsync(async () => {
      component.registerForm.setValue({
        title: 'Mr',
        firstName: 'SingleName',
        lastName: '',
        email: 'single@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'user'
      });

      mockAuthService.registerWithEmail.mockResolvedValueOnce({});

      await component.onRegister();
      tick();

      expect(mockAuthService.registerWithEmail).toHaveBeenCalledWith(
        'single@example.com',
        'Password123',
        'SingleName',
        'user',
        'SingleName',
        'male'
      );
      tick(2000);
    }));
  });

  describe('signInWithGoogle', () => {
    // Enable fake timers for tests involving setTimeout
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it('should call authService.signInWithGoogle and navigate on success', fakeAsync(async () => {
      mockAuthService.signInWithGoogle.mockResolvedValueOnce({});

      await component.signInWithGoogle();

      expect(component.isLoading).toBe(true);
      tick();
      expect(mockAuthService.signInWithGoogle).toHaveBeenCalled();
      expect(component.successMessage).toBe('Google registration successful! You will be redirected to the dashboard shortly.');
      expect(component.errorMessage).toBeNull();
      expect(component.isLoading).toBe(false);

      tick(2000);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
    }));

    it('should handle Google sign-in error: popup-closed-by-user', fakeAsync(async () => {
      mockAuthService.signInWithGoogle.mockRejectedValueOnce({ code: 'auth/popup-closed-by-user' });

      await component.signInWithGoogle();
      tick();

      expect(component.isLoading).toBe(false);
      expect(component.errorMessage).toBe('Google sign-in was cancelled by the user.');
      expect(component.successMessage).toBeNull();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));

    it('should handle generic Google sign-in error', fakeAsync(async () => {
      mockAuthService.signInWithGoogle.mockRejectedValueOnce(new Error('Google Auth Failed'));

      await component.signInWithGoogle();
      tick();

      expect(component.isLoading).toBe(false);
      expect(component.errorMessage).toBe('Google registration failed. An unexpected error occurred. Please try again.');
      expect(component.successMessage).toBeNull();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));
  });

  // Test to ensure the RouterLink is correctly recognized in the template
  it('should render the login link with the correct path', () => {
    // When MockRouterLinkDirective is used, By.directive(RouterLink) correctly finds instances
    // of our mock. We can then check its inputs.
    const loginLinkDebugElement = fixture.debugElement.query(By.directive(MockRouterLinkDirective));
    expect(loginLinkDebugElement).toBeTruthy();
    const mockLinkInstance = loginLinkDebugElement.injector.get(MockRouterLinkDirective);
    expect(mockLinkInstance.routerLink).toBe('/login');
  });
});
