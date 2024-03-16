export interface UserModel {
  id?: string;
  auth0_id: string;
  username: string;
  name: string;
  email: string;
  description?: string;
  role?: string;
  picture?: string;
  created_at?: Date;
  followers?: number;
  following?: number;
}
