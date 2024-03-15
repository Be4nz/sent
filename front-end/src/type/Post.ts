export interface PostModel {
  id?: string;
  created_at?: Date;
  content: string;
  like_count?: number;
  comment_count?: number;
  save_count?: number;
  user_id: string;
}

export interface PostRequestModel {
  content: string;
  user_id: string;
}
