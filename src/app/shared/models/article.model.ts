export interface Article {
  id?: string;
  title: string;
  thumbnailUrl?: string;
  briefDescription: string;
  content: string;
  authorId: string;
  authorName: string;
  publishDate: Date;
  tags?: string[];
  isFeatured?: boolean;
  // Add other fields as needed
}
