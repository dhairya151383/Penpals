export interface AppUser {
  uid: string;
  email: string;
  username: string;
  roles: {
    admin: boolean;
    user: boolean;
    author?: boolean; // Added author role as optional
  };
  createdAt: string; // ISO string
  profile: {
    displayName: string;
    photoURL: string;
  };
  provider: string; // 'google', 'facebook', 'email'
}