import { Injectable } from '@angular/core';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { Author } from '../../shared/models/author.model';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  constructor(private firebase: FirebaseService) {}
  private get authorCollection() {
    return collection(this.firebase.firestore, 'authors');
  }

  private get userCollection() {
    return collection(this.firebase.firestore, 'users');
  }

  async getAll(): Promise<Author[]> {
    const snapshot = await getDocs(this.authorCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Author);
  }

  async getById(id: string): Promise<Author | null> {
    const docRef = doc(this.authorCollection, id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Author : null;
  }

  async update(id: string, data: Partial<Author>) {
    const authorRef = doc(this.authorCollection, id);
    await updateDoc(authorRef, data);
    if (data.avatarUrl) {
      const userRef = doc(this.userCollection, id); // Assuming authorId == userId
      await updateDoc(userRef, {
        'profile.photoURL': data.avatarUrl,
      });
    }
  }

  async create(id: string, author: Author) {
    const docRef = doc(this.authorCollection, id);
    await setDoc(docRef, { ...author, createdAt: new Date().toISOString() });
  }
}
