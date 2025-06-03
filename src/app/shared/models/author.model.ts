export interface Author {
  id?: string;
  name: string;
  bio?: string;
  tags?: string[];
  avatarUrl?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
