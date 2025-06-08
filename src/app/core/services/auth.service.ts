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
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { doc, setDoc, getDoc } from '@angular/fire/firestore';
import { switchMap, map } from 'rxjs/operators';

import { Users } from './../../shared/models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { AuthorService } from './author.service';
import { Author } from '../../shared/models/author.model';
import { Router } from '@angular/router';

// --- Define the AppUser interface ---
export interface AppUser extends User {
  roles?: {
    admin?: boolean;
    user?: boolean;
    author?: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<AppUser | null>;
  authReady$ = new BehaviorSubject<boolean>(false);
  // REMOVE THIS LINE: private firestore: Firestore;

  private readonly defaultMaleAvatarUrl = 'assets/images/maleAvatar.jpg';
  private readonly defaultFemaleAvatarUrl = 'assets/images/femaleAvatar.jpg';
  private readonly defaultGenericAvatarUrl = 'assets/images/defaultAvatar.jpg';

  constructor(
    private firebaseService: FirebaseService,
    private authorService: AuthorService,
    private router: Router
  ) {
    // REMOVE THIS LINE: this.firestore = firebaseService.firestore;

    // --- Modify user$ to include roles from Firestore ---
    this.user$ = new Observable<User | null>((subscriber) => {
      // Listen for Firebase auth state changes
      return onAuthStateChanged(this.firebaseService.auth, (user) => {
        subscriber.next(user);
      });
    }).pipe(
      // Use switchMap to fetch user roles from Firestore when auth state changes
      switchMap(user => {
        if (user) {
          const userDocRef = doc(this.firebaseService.firestore, `users/${user.uid}`);
          // Convert the Firestore getDoc Promise to an Observable using 'from'
          return from(getDoc(userDocRef)).pipe(
            map(docSnap => {
              const userData = docSnap.data() as Users | undefined;
              // Merge the roles from Firestore data into the Firebase User object
              return { ...user, roles: userData?.roles } as AppUser;
            })
          );
        } else {
          // If no user is logged in, emit null
          return of(null);
        }
      })
    );

    // Set authReady$ to true once Firebase Auth is initialized
    onAuthStateChanged(this.firebaseService.auth, () => {
      this.authReady$.next(true);
    });
  }

  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.firebaseService.auth, provider);
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
    gender: string
  ): Promise<User | null> {
    try {
      const result = await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
      await updateProfile(result.user, { displayName });
      await this.saveUserData(result.user, username, 'email', role, displayName, gender);

      if (role === 'author') {
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

  private getAvatarUrlByGender(gender: string): string {
    if (gender === 'male') {
      return this.defaultMaleAvatarUrl;
    } else if (gender === 'female') {
      return this.defaultFemaleAvatarUrl;
    } else {
      return this.defaultGenericAvatarUrl;
   }
  }

  private async saveUserData(
    user: User,
    username?: string,
    provider: string = 'google',
    role: string = 'user',
    displayName?: string,
    gender: string = 'unknown'
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

    const finalPhotoURL = user.photoURL || this.getAvatarUrlByGender(gender);

    const userData: Users = {
      uid: user.uid,
      email: user.email || '',
      username: username || user.displayName || user.email?.split('@')[0] || 'anonymous',
      gender,
      roles,
      createdAt: new Date().toISOString(),
      profile: {
        displayName: displayName || user.displayName || username || 'Anonymous User',
        photoURL: finalPhotoURL,
      },
      provider,
    };

    const userRef = doc(this.firebaseService.firestore, 'users', user.uid);
    await setDoc(userRef, userData, { merge: true });
  }
}