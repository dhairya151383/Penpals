
import { Timestamp } from "firebase/firestore";

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  content: string;
  createdAt: Timestamp;
  likes: number;
  parentId?: string | null;
  replies?: Comment[];
}
