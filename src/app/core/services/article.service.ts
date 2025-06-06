import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Article } from "../../shared/models/article.model";
import { FirebaseService } from "./firebase.service";
import { Injectable } from "@angular/core";
import { Timestamp } from "firebase/firestore";

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
    // Get document data
    const data = (articleData as QueryDocumentSnapshot<DocumentData>).data
      ? (articleData as QueryDocumentSnapshot<DocumentData>).data()
      : (articleData as DocumentData);

    // Spread data and add document ID from Firestore snapshot (if available)
    const article: Article = { id: (articleData as QueryDocumentSnapshot).id, ...data } as Article;

    // Convert publishDate
    if (article.publishDate instanceof Timestamp) {
      article.publishDate = article.publishDate.toDate();
    } else if (typeof article.publishDate === 'string') {
      article.publishDate = new Date(article.publishDate);
    } else if (article.publishDate === null || article.publishDate === undefined) {
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
    return snapshot.docs.map(docSnap => {
      return this.convertArticleDates(docSnap);
    });
  }

  async getById(id: string): Promise<Article | null> {
    const docRef = doc(this.articlesRef, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return this.convertArticleDates(docSnap);
    }
    return null;
  }

  async create(article: Article): Promise<string> {
    // Add the article document to Firestore
    const docRef = await addDoc(this.articlesRef, article);

    // Update the document with its generated ID inside the document data
    await updateDoc(docRef, { id: docRef.id });

    return docRef.id;
  }

  async update(id: string, article: Partial<Article>): Promise<void> {
    const docRef = doc(this.articlesRef, id);
    // Ensure that thumbnailUrl can be updated
    await updateDoc(docRef, article);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.articlesRef, id);
    await deleteDoc(docRef);
  }

  async getByAuthorId(authorId: string): Promise<Article[]> {
    const q = query(this.articlesRef, where('authorId', '==', authorId), orderBy('publishDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => {
      return this.convertArticleDates(docSnap);
    });
  }
}