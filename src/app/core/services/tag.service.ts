import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, CollectionReference, doc, setDoc, query } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Tag } from '../../shared/models/tag.model';

@Injectable({ providedIn: 'root' })
export class TagService {
  private tagCollection: CollectionReference;

  constructor(private firebase: FirebaseService) {
    this.tagCollection = collection(this.firebase.firestore, 'tags');
  }

  async getAll(type?: 'author' | 'article'): Promise<Tag[]> {
    const snapshot = await getDocs(query(this.tagCollection));
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Tag))
      .filter(tag => !type || tag.type === type);
  }

  async addTag(name: string, type: 'author' | 'article'): Promise<Tag> {
    const trimmed = name.trim().toLowerCase();
    const allTags = await this.getAll(type);
    const existing = allTags.find(t => t.name.toLowerCase() === trimmed);
    if (existing) return existing;

    const newTag: Tag = { name: trimmed, type };
    const docRef = await addDoc(this.tagCollection, newTag);
    return { id: docRef.id, ...newTag };
  }

}
