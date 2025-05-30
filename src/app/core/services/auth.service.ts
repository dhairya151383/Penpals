import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { AppUser } from './../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  private firestore: Firestore;

  constructor(private firebaseService: FirebaseService) {
    this.user$ = user(this.firebaseService.auth);
    this.firestore = firebaseService.firestore;
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.firebaseService.auth, provider);
      // Store user data in Firestore if it's a new user
      await this.saveUserData(result.user);
      console.log('Signed in with Google');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error; // Re-throw to be caught by component
    }
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.firebaseService.auth, email, password);
      console.log('Signed in with Email');
      return result.user;
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      throw error;
    }
  }

  async registerWithEmail(email: string, password: string, username: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
      await this.saveUserData(result.user, username, 'email');
      console.log('Registered with Email');
      return result.user;
    } catch (error) {
      console.error('Email Registration Error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.firebaseService.auth);
      console.log('Signed out');
    } catch (error) {
      console.error('Sign-Out Error:', error);
      throw error;
    }
  }

  private async saveUserData(user: User, username?: string, provider: string = 'google') {
    if (user.uid) {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const userData: AppUser = {
        uid: user.uid,
        email: user.email || '',
        username: username || user.displayName || user.email?.split('@')[0] || 'anonymous',
        roles: { admin: false, user: true }, // Default roles
        createdAt: new Date().toISOString(),
        profile: {
          displayName: user.displayName || username || user.email?.split('@')[0] || 'Anonymous User',
          photoURL: user.photoURL || 'https://placehold.co/150x150/cccccc/000000?text=User'
        },
        provider: provider
      };
      await setDoc(userRef, userData, { merge: true }); // Merge to avoid overwriting existing data
    }
  }

  // Dummy method to get user roles (in a real app, this would fetch from Firestore/backend)
  getUserRoles(uid: string): string[] {
    // This is a placeholder. In a real app, you'd fetch user roles from their Firestore document.
    if (uid === 'someAuthorUid') { // Replace with actual logic or fetch from Firestore
      return ['author', 'reader'];
    }
    return ['reader'];
  }
}
