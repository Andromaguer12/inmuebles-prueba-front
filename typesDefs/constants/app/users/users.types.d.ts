export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  description: string;
  image: string;
  permissions: 'admin' | 'common';
  phone?: string;
  mediaToken?: string | null;
}
