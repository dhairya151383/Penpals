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
  // Removed private lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;
  // This will now be managed by the component for top-level comments specifically.

  constructor(private firebase: FirebaseService) { }

  getComments(articleId: string) {
    console.log('CommentService: getComments called for articleId:', articleId);
    if (!this.commentSubjects.has(articleId)) {
      console.log('CommentService: Creating new BehaviorSubject for articleId:', articleId);
      const subject = new BehaviorSubject<Comment[]>([]);
      this.commentSubjects.set(articleId, subject);
      this.listenToComments(articleId, subject);
    }
    return this.commentSubjects.get(articleId)!.asObservable();
  }

  private listenToComments(articleId: string, subject: BehaviorSubject<Comment[]>) {
    console.log('CommentService: Setting up real-time listener for all comments for articleId:', articleId);
    const commentRef = collection(this.firebase.firestore, 'comments');
    // Important: The real-time listener should fetch ALL comments for the article,
    // including replies, so `getReplies` in the component can work.
    const q = query(commentRef, where('articleId', '==', articleId), orderBy('createdAt', 'desc'));

    onSnapshot(q, (snapshot) => {
      const comments: Comment[] = [];
      snapshot.forEach((doc) => {
        comments.push(doc.data() as Comment);
      });
      console.log('CommentService: Real-time listener: Fetched', comments.length, 'total comments from Firestore.');
      subject.next(comments);
    }, (error) => {
      console.error('CommentService: Real-time listener error:', error);
    });
  }

  async addComment(articleId: string, content: string, userId: string, userName: string, userAvatarUrl: string) {
    console.log('CommentService: Adding comment for articleId:', articleId, 'content:', content);
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
      parentId: null
    };

    const commentDoc = doc(this.firebase.firestore, 'comments', id);
    try {
      await setDoc(commentDoc, newComment);
      console.log('CommentService: Comment added successfully:', newComment.id);
    } catch (error) {
      console.error('CommentService: Error adding comment:', error);
      throw error; // Re-throw to propagate to component
    }
  }

  async likeComment(commentId: string) {
    console.log('CommentService: Liking comment:', commentId);
    const commentDoc = doc(this.firebase.firestore, 'comments', commentId);
    try {
      await updateDoc(commentDoc, {
        likes: increment(1),
      });
      console.log('CommentService: Comment liked successfully:', commentId);
    } catch (error) {
      console.error('CommentService: Error liking comment:', error);
      throw error;
    }
  }

  async addReply(
    articleId: string,
    parentId: string,
    content: string,
    userId: string,
    userName: string,
    userAvatarUrl: string
  ) {
    console.log('CommentService: Adding reply to parent:', parentId, 'content:', content);
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
      // replies: [], // No need for this in the Firestore document; replies are separate documents
    };

    const commentDoc = doc(this.firebase.firestore, 'comments', id);
    try {
      await setDoc(commentDoc, newReply);
      console.log('CommentService: Reply added successfully:', newReply.id);
    } catch (error) {
      console.error('CommentService: Error adding reply:', error);
      throw error;
    }
  }

  async loadMoreComments(articleId: string, pageSize = 5, lastVisibleCommentId: string | null = null): Promise<Comment[]> {
    console.log('CommentService: loadMoreComments called for articleId:', articleId, 'pageSize:', pageSize, 'lastVisibleCommentId:', lastVisibleCommentId);
    const commentRef = collection(this.firebase.firestore, 'comments');
    let q = query(
      commentRef,
      where('articleId', '==', articleId),
      where('parentId', '==', null), // This is for top-level only
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    let lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null;
    if (lastVisibleCommentId) {
      // To use startAfter with a commentId, we need to fetch the document first
      const docSnapshot = await getDocs(query(commentRef, where('id', '==', lastVisibleCommentId)));
      if (!docSnapshot.empty) {
        lastVisibleDoc = docSnapshot.docs[0];
        q = query(q, startAfter(lastVisibleDoc));
        console.log('CommentService: loadMoreComments: Querying with startAfter document:', lastVisibleDoc.id);
      } else {
        console.warn('CommentService: loadMoreComments: lastVisibleCommentId provided but document not found. Ignoring startAfter.');
      }
    }


    try {
      const snapshot = await getDocs(q);
      const fetchedComments = snapshot.docs.map(doc => doc.data() as Comment);
      console.log('CommentService: loadMoreComments: Fetched', fetchedComments.length, 'top-level comments.');
      return fetchedComments;
    } catch (error) {
      console.error('CommentService: Error in loadMoreComments:', error);
      throw error;
    }
  }

  async deleteComment(commentId: string) {
    console.log('CommentService: Deleting comment:', commentId);
    const docRef = doc(this.firebase.firestore, 'comments', commentId);
    try {
      await deleteDoc(docRef);
      console.log('CommentService: Comment deleted successfully:', commentId);
    } catch (error) {
      console.error('CommentService: Error deleting comment:', error);
      throw error;
    }
  }

  async editComment(commentId: string, content: string) {
    console.log('CommentService: Editing comment:', commentId, 'with content:', content);
    const docRef = doc(this.firebase.firestore, 'comments', commentId);
    try {
      await updateDoc(docRef, { content });
      console.log('CommentService: Comment edited successfully:', commentId);
    } catch (error) {
      console.error('CommentService: Error editing comment:', error);
      throw error;
    }
  }
}