import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Article } from "../../shared/models/article.model";
import { FirebaseService } from "./firebase.service";
import { Injectable } from "@angular/core";
import { Timestamp } from "firebase/firestore"; // Import Timestamp

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private firebase: FirebaseService) {}

  private get articlesRef() {
    return collection(this.firebase.firestore, 'articles');
  }

  // Helper function to convert Firestore Timestamps (and strings) to JavaScript Date objects
  private convertArticleDates(articleData: DocumentData | QueryDocumentSnapshot<DocumentData>): Article {
    // If articleData is a QueryDocumentSnapshot, get its data
    const data = (articleData as QueryDocumentSnapshot<DocumentData>).data
      ? (articleData as QueryDocumentSnapshot<DocumentData>).data()
      : (articleData as DocumentData);

    const article: Article = { ...data } as Article; // Create a mutable copy

    // Convert publishDate
    if (article.publishDate instanceof Timestamp) {
      article.publishDate = article.publishDate.toDate();
    } else if (typeof article.publishDate === 'string') {
      article.publishDate = new Date(article.publishDate);
    } else if (article.publishDate === null || article.publishDate === undefined) {
      // Handle cases where publishDate might be null or undefined
      article.publishDate = null;
    }

    // Convert updatedAt
    if (article.updatedAt instanceof Timestamp) {
      article.updatedAt = article.updatedAt.toDate();
    } else if (typeof article.updatedAt === 'string') {
      article.updatedAt = new Date(article.updatedAt);
    }

    return article;
  }


  async getAll(): Promise<Article[]> {
    const snapshot = await getDocs(this.articlesRef);
    return snapshot.docs.map(doc => {
      // Apply conversion for each document
      return { id: doc.id, ...this.convertArticleDates(doc) };
    });
  }

  async getById(id: string): Promise<Article | null> {
    const docRef = doc(this.articlesRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Apply conversion for the single document
      return { id: docSnap.id, ...this.convertArticleDates(docSnap) };
    }
    return null;
  }

  async create(article: Article): Promise<string> {
    // When creating, you might want to convert Date objects back to Timestamps
    // if your backend explicitly expects Timestamps.
    // For now, assuming Firestore can handle Date objects directly on write.
    // If not, you'd add conversion here before addDoc.
    const docRef = await addDoc(this.articlesRef, article);
    return docRef.id;
  }

  async update(id: string, article: Partial<Article>): Promise<void> {
    const docRef = doc(this.articlesRef, id);
    // Similar to create, consider converting Date objects back to Timestamps
    // if needed by your Firestore rules/structure on update.
    await updateDoc(docRef, article);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.articlesRef, id);
    await deleteDoc(docRef);
  }

  async getByAuthorId(authorId: string): Promise<Article[]> {
    const q = query(this.articlesRef, where('authorId', '==', authorId), orderBy('publishDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      // Apply conversion for each document
      return { id: doc.id, ...this.convertArticleDates(doc) };
    });
  }
}