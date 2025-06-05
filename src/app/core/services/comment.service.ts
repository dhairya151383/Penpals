
import { Injectable } from '@angular/core';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  onSnapshot,
  Timestamp,
  serverTimestamp,
  setDoc,
  doc,
  updateDoc,
  increment,
  deleteDoc
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Comment } from '../../shared/models/comment.model';
import { FirebaseService } from './firebase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentSubjects = new Map<string, BehaviorSubject<Comment[]>>();
  private lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;

  constructor(private firebase: FirebaseService) { }

  getComments(articleId: string) {
    if (!this.commentSubjects.has(articleId)) {
      const subject = new BehaviorSubject<Comment[]>([]);
      this.commentSubjects.set(articleId, subject);
      this.listenToComments(articleId, subject);
    }
    return this.commentSubjects.get(articleId)!.asObservable();
  }

  private listenToComments(articleId: string, subject: BehaviorSubject<Comment[]>) {
    const commentRef = collection(this.firebase.firestore, 'comments');
    // This query correctly fetches ALL comments for the article, including replies
    const q = query(commentRef, where('articleId', '==', articleId), orderBy('createdAt', 'desc')); // Order for easier processing

    onSnapshot(q, (snapshot) => {
      const comments: Comment[] = [];
      snapshot.forEach((doc) => {
        comments.push(doc.data() as Comment);
      });
      subject.next(comments); // Emit all comments fetched
    });
  }

  // ✅ Updated: Add avatar URL
  async addComment(articleId: string, content: string, userId: string, userName: string, userAvatarUrl: string) {
    const id = uuidv4();
    const newComment: Comment = {
      id,
      articleId,
      content,
      userId,
      userName,
      userAvatarUrl,
      createdAt: serverTimestamp() as Timestamp,
      likes: 0,
      replies: [],
    };

    const commentDoc = doc(this.firebase.firestore, 'comments', id);
    await setDoc(commentDoc, newComment);
  }

  async likeComment(commentId: string) {
    const commentDoc = doc(this.firebase.firestore, 'comments', commentId);
    await updateDoc(commentDoc, {
      likes: increment(1),
    });
  }

  // ✅ Updated: Add avatar URL
  async addReply(
    articleId: string,
    parentId: string,
    content: string,
    userId: string,
    userName: string,
    userAvatarUrl: string
  ) {
    const id = uuidv4();
    const newReply: Comment = {
      id,
      articleId,
      parentId,
      content,
      userId,
      userName,
      userAvatarUrl,
      createdAt: serverTimestamp() as Timestamp,
      likes: 0,
      replies: [],
    };

    const commentDoc = doc(this.firebase.firestore, 'comments', id);
    await setDoc(commentDoc, newReply);
  }

  async loadMoreComments(articleId: string, pageSize = 5): Promise<Comment[]> {
    const commentRef = collection(this.firebase.firestore, 'comments');
    let q = query(
      commentRef,
      where('articleId', '==', articleId),
      where('parentId', '==', null), // This is for top-level only
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (this.lastVisible) {
      q = query(q, startAfter(this.lastVisible));
    }

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      this.lastVisible = snapshot.docs[snapshot.docs.length - 1];
    }

    return snapshot.docs.map(doc => doc.data() as Comment);
  }

  async deleteComment(commentId: string) {
    const docRef = doc(this.firebase.firestore, 'comments', commentId);
    await deleteDoc(docRef);
  }

  async editComment(commentId: string, content: string) {
    const docRef = doc(this.firebase.firestore, 'comments', commentId);
    await updateDoc(docRef, { content });
  }
}
