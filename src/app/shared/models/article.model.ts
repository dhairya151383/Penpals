export interface Article {
  id?: string;                     // Firestore document ID
  title: string;
  thumbnailUrl?: string;          // Optional cover image
  briefDescription: string;      // Short intro/summary (used in previews/cards)
  content: string;               // Rich text or HTML string from editor
  authorId: string;              // Ref to Author document
  authorName?: string;           // Redundant but useful for quick UI display
  publishDate: Date | string | null;

  tags?: string[];               // e.g. ["AI", "Education"]
  isFeatured?: boolean;         // For homepage or highlighted display
  isPublished?: boolean;        // Useful for draft/save modes
  likesCount?: number;          // Social engagement
  commentsCount?: number;       // Optional, to cache number of comments
  readingTime?: number;         // In minutes (can be calculated from content)

  createdAt?: Date | string;     // Created timestamp (optional for auditing)
  updatedAt?: Date | string;     // Last edit time
}
