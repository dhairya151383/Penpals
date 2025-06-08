export interface Users {
  uid: string;
  email: string;
  username: string;
  gender: string;
  roles: {
    admin: boolean;
    user: boolean;
    author?: boolean;
  };
  createdAt: string;
  profile: {
    displayName: string;
    photoURL: string;
  };
  provider: string;
}