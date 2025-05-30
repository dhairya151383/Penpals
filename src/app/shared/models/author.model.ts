export interface Author {
  id?: string; // Firestore document ID
  uid: string; // Firebase Auth UID
  displayName: string;
  email: string;
  profilePictureUrl?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  roles: string[]; // e.g., ['reader', 'author', 'admin']
  // Add other author-specific fields as needed
}