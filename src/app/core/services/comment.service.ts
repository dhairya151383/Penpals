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
  deleteDoc,
  arrayUnion,
  arrayRemove,
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

  constructor(private firebase: FirebaseService) {}

  getComments(articleId: string) {
    if (!this.commentSubjects.has(articleId)) {
      const subject = new BehaviorSubject<Comment[]>([]);
      this.commentSubjects.set(articleId, subject);
      this.listenToComments(articleId, subject);
    }
    return this.commentSubjects.get(articleId)!.asObservable();
  }

  private listenToComments(
    articleId: string,
    subject: BehaviorSubject<Comment[]>
  ) {
    const commentRef = collection(this.firebase.firestore, 'comments');
    const q = query(commentRef, where('articleId', '==', articleId));
    onSnapshot(
      q,
      (snapshot) => {
        const comments: Comment[] = [];
        snapshot.forEach((doc) => {
          comments.push(doc.data() as Comment);
        });
        subject.next(comments);
      },
      (error) => {
        console.error('CommentService: Real-time listener error:', error);
      }
    );
  }

  async addComment(
    articleId: string,
    content: string,
    userId: string,
    userName: string,
    userAvatarUrl: string
  ) {
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
      parentId: null,
      likedBy: [],
    };

    const commentDoc = doc(this.firebase.firestore, 'comments', id);
    try {
      await setDoc(commentDoc, newComment);
    } catch (error) {
      console.error('CommentService: Error adding comment:', error);
      throw error;
    }
  }

  async toggleLikeComment(commentId: string, userId: string) {
    const commentDocRef = doc(this.firebase.firestore, 'comments', commentId);

    try {
      const commentSnapshot = await getDocs(
        query(
          collection(this.firebase.firestore, 'comments'),
          where('id', '==', commentId)
        )
      );
      if (commentSnapshot.empty) {
        console.warn(
          'CommentService: Comment not found for liking:',
          commentId
        );
        return;
      }
      const commentData = commentSnapshot.docs[0].data() as Comment;
      const likedBy = commentData.likedBy || []; // Ensure likedBy array exists
      if (likedBy.includes(userId)) {
        await updateDoc(commentDocRef, {
          likes: increment(-1),
          likedBy: arrayRemove(userId),
        });
      } else {
        await updateDoc(commentDocRef, {
          likes: increment(1),
          likedBy: arrayUnion(userId),
        });
      }
    } catch (error) {
      console.error('CommentService: Error toggling like for comment:', error);
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
      likedBy: [],
    };

    const commentDoc = doc(this.firebase.firestore, 'comments', id);
    try {
      await setDoc(commentDoc, newReply);
    } catch (error) {
      console.error('CommentService: Error adding reply:', error);
      throw error;
    }
  }
  async loadMoreComments(
    articleId: string,
    pageSize = 5,
    lastVisibleCommentId: string | null = null,
    sortBy: 'newest' | 'oldest' | 'mostLiked' = 'newest'
  ): Promise<Comment[]> {
    const commentRef = collection(this.firebase.firestore, 'comments');
    let q;
    let orderField: string = 'createdAt';
    let orderDirection: 'asc' | 'desc' = 'desc';
    if (sortBy === 'oldest') {
      orderDirection = 'asc';
    } else if (sortBy === 'mostLiked') {
      orderField = 'likes';
      orderDirection = 'desc';
    }
    q = query(
      commentRef,
      where('articleId', '==', articleId),
      where('parentId', '==', null), // Only fetch top-level comments
      orderBy(orderField, orderDirection),
      limit(pageSize)
    );

    let lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null;
    if (lastVisibleCommentId) {
      const lastDocQuery = query(
        commentRef,
        where('id', '==', lastVisibleCommentId),
        limit(1)
      );
      const docSnapshot = await getDocs(lastDocQuery);
      if (!docSnapshot.empty) {
        lastVisibleDoc = docSnapshot.docs[0];
        q = query(q, startAfter(lastVisibleDoc));
      } else {
        console.warn(
          'CommentService: loadMoreComments: lastVisibleCommentId provided but document not found. Ignoring startAfter.'
        );
      }
    }

    try {
      const snapshot = await getDocs(q);
      const fetchedComments = snapshot.docs.map((doc) => doc.data() as Comment);
      return fetchedComments;
    } catch (error) {
      console.error('CommentService: Error in loadMoreComments:', error);
      throw error;
    }
  }

  async deleteComment(commentId: string) {
    const commentRef = collection(this.firebase.firestore, 'comments');
    const commentDocRef = doc(commentRef, commentId);
    try {
      await deleteDoc(commentDocRef);
      const repliesQuery = query(
        commentRef,
        where('parentId', '==', commentId)
      );
      const replySnapshot = await getDocs(repliesQuery);
      const deletePromises = replySnapshot.docs.map((replyDoc) =>
        deleteDoc(replyDoc.ref)
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error(
        'CommentService: Error deleting comment and its replies:',
        error
      );
      throw error;
    }
  }
  async getAllCommentMetadata(): Promise<{ articleId: string }[]> {
    const commentRef = collection(this.firebase.firestore, 'comments');
    const snapshot = await getDocs(commentRef);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { articleId: data['articleId'] };
    });
  }

  async editComment(commentId: string, content: string) {
    const docRef = doc(this.firebase.firestore, 'comments', commentId);
    try {
      await updateDoc(docRef, { content });
    } catch (error) {
      console.error('CommentService: Error editing comment:', error);
      throw error;
    }
  }
}
