export interface Author {
  id?: string;            // Firestore document ID
  name: string;           // Full name
  bio?: string;           // Short biography
  avatarUrl?: string;     // Profile picture URL
  website?: string;       // Personal or professional website
  socialLinks?: {         // Optional social media links
    twitter?: string;
    linkedin?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
