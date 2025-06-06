export interface Article {
  id?: string;
  title: string;
  thumbnailUrl?: string;
  briefDescription: string;
  content: string;
  authorId: string;
  authorName?: string;
  publishDate: Date | string | null;
  tags?: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
  likesCount?: number;
  commentsCount?: number;
  updatedAt?: Date | string;
}
