import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
  CollectionReference
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Author } from '../../shared/models/author.model';


@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private firebase: FirebaseService) {}

  private get authorsRef(): CollectionReference<DocumentData> {
    return collection(this.firebase.firestore, 'authors');
  }

  async getAll(): Promise<Author[]> {
    const snapshot = await getDocs(this.authorsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Author));
  }

  async getById(id: string): Promise<Author | null> {
    const docRef = doc(this.authorsRef, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Author) : null;
  }

  async create(author: Author): Promise<string> {
    const docRef = await addDoc(this.authorsRef, author);
    return docRef.id;
  }

  async update(id: string, author: Partial<Author>): Promise<void> {
    const docRef = doc(this.authorsRef, id);
    await updateDoc(docRef, author);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.authorsRef, id);
    await deleteDoc(docRef);
  }
}
