// src/app/core/services/auth.service.ts
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  authReady$ = new BehaviorSubject<boolean>(false);
  private firestore: Firestore;

  constructor(private firebaseService: FirebaseService) {
    this.firestore = firebaseService.firestore;

    // Observable for the current user
    // Since `user` function is not imported, subscribe to onAuthStateChanged manually:
    this.user$ = new Observable((subscriber) => {
      return onAuthStateChanged(this.firebaseService.auth, (user) => {
        subscriber.next(user);
      });
    });

    // Signal when auth is ready (initial auth state restored)
    onAuthStateChanged(this.firebaseService.auth, () => {
      this.authReady$.next(true);
    });
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.firebaseService.auth, provider);
      await this.saveUserData(result.user, undefined, 'google', 'user');
      console.log('Signed in with Google');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
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

  async registerWithEmail(
  email: string,
  password: string,
  username: string,
  role: string,
  displayName: string
): Promise<User | null> {
  try {
    const result = await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
    
    // Update the Firebase Auth profile displayName
    await updateProfile(result.user, { displayName });
    
    // Save user info to Firestore
    await this.saveUserData(result.user, username, 'email', role);

    return result.user;
  } catch (error) {
    console.error('Register Error:', error);
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

  private async saveUserData(
    user: User,
    username?: string,
    provider: string = 'google',
    role: string = 'user',
    displayName?: string
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

    const userData: Users = {
      uid: user.uid,
      email: user.email || '',
      username: username || user.displayName || user.email?.split('@')[0] || 'anonymous',
      roles,
      createdAt: new Date().toISOString(),
      profile: {
        displayName: displayName || user.displayName || username || 'Anonymous User',
        photoURL: user.photoURL || 'https://placehold.co/150x150/cccccc/000000?text=User',
      },
      provider,
    };

    const userRef = doc(this.firestore, 'users', user.uid);
    await setDoc(userRef, userData, { merge: true });
  }
}
