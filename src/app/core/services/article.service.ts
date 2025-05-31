import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { Article } from "../../shared/models/article.model";
import { FirebaseService } from "./firebase.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private firebase: FirebaseService) {}

  private get articlesRef() {
    return collection(this.firebase.firestore, 'articles');
  }

  async getAll(): Promise<Article[]> {
    const snapshot = await getDocs(this.articlesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
  }

  async getById(id: string): Promise<Article | null> {
    const docRef = doc(this.articlesRef, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Article) : null;
  }

  async create(article: Article): Promise<string> {
    const docRef = await addDoc(this.articlesRef, article);
    return docRef.id;
  }

  async update(id: string, article: Partial<Article>): Promise<void> {
    const docRef = doc(this.articlesRef, id);
    await updateDoc(docRef, article);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.articlesRef, id);
    await deleteDoc(docRef);
  }

  async getByAuthorId(authorId: string): Promise<Article[]> {
    const q = query(this.articlesRef, where('authorId', '==', authorId), orderBy('publishDate', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
  }
}
