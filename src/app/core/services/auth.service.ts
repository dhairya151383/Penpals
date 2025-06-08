import { Injectable } from '@angular/core';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Users } from './../../shared/models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { AuthorService } from './author.service';
import { Author } from '../../shared/models/author.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  authReady$ = new BehaviorSubject<boolean>(false);
  private firestore: Firestore;
  // Define specific default avatar URLs
  private readonly defaultMaleAvatarUrl = 'assets/images/maleAvatar.jpg';
  private readonly defaultFemaleAvatarUrl = 'assets/images/femaleAvatar.jpg';
  private readonly defaultGenericAvatarUrl = 'assets/images/defaultAvatar.jpg';

  constructor(
    private firebaseService: FirebaseService,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.firestore = firebaseService.firestore;

    this.user$ = new Observable((subscriber) => {
      return onAuthStateChanged(this.firebaseService.auth, (user) => {
        subscriber.next(user);
      });
    });

    onAuthStateChanged(this.firebaseService.auth, () => {
      this.authReady$.next(true);
    });
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.firebaseService.auth, provider);
      // For Google sign-in, we typically don't get gender directly.
      // You might infer it from other data or keep 'unknown' or 'defaultGenericAvatarUrl'.
      // For this example, we'll use 'unknown' for gender and the generic avatar.
      await this.saveUserData(result.user, undefined, 'google', 'user', undefined, 'unknown');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.firebaseService.auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      throw error;
    }
  }

  async registerWithEmail(
    email: string,
    password: string,
    username: string,
    role: string,
    displayName: string,
    gender: string // Gender is now a required parameter
  ): Promise<User | null> {
    try {
      const result = await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
      await updateProfile(result.user, { displayName });
      // Pass gender to saveUserData
      await this.saveUserData(result.user, username, 'email', role, displayName, gender);

      if (role === 'author') {
        // When an author registers, determine their avatar based on gender if no photoURL exists
        const avatarUrl = result.user.photoURL || this.getAvatarUrlByGender(gender);
        const authorData: Author = {
          id: result.user.uid,
          name: displayName,
          avatarUrl,
          createdAt: new Date().toISOString(),
        };
        await this.authorService.create(result.user.uid, authorData);
      }
      return result.user;
    } catch (error) {
      console.error('Register Error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.firebaseService.auth);
    } catch (error) {
      console.error('Sign-Out Error:', error);
      throw error;
    } finally {
      this.router.navigate(['/login']);
    }
  }

  // Helper method to get avatar URL based on gender
  private getAvatarUrlByGender(gender: string): string {
    if (gender === 'male') {
      return this.defaultMaleAvatarUrl;
    } else if (gender === 'female') {
      return this.defaultFemaleAvatarUrl;
    } else {
      return this.defaultGenericAvatarUrl; // Fallback
    }
  }

  private async saveUserData(
    user: User,
    username?: string,
    provider: string = 'google',
    role: string = 'user',
    displayName?: string,
    gender: string = 'unknown' // Ensure gender is always passed, default to 'unknown'
  ) {
    const roles: { admin: boolean; user: boolean; author?: boolean } = {
      admin: false,
      user: false,
    };

    if (role === 'author') {
      roles.author = true;
    } else if (role === 'admin' || role === 'user') {
      roles[role] = true;
    }

    // Determine the photoURL based on the provided user photoURL, otherwise by gender
    const finalPhotoURL = user.photoURL || this.getAvatarUrlByGender(gender);

    const userData: Users = {
      uid: user.uid,
      email: user.email || '',
      username: username || user.displayName || user.email?.split('@')[0] || 'anonymous',
      gender, // Assign the gender here
      roles,
      createdAt: new Date().toISOString(),
      profile: {
        displayName: displayName || user.displayName || username || 'Anonymous User',
        photoURL: finalPhotoURL, // Use the determined finalPhotoURL
      },
      provider,
    };

    const userRef = doc(this.firestore, 'users', user.uid);
    await setDoc(userRef, userData, { merge: true });
  }
}