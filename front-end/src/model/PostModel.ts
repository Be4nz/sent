export interface PostModel {
	id: number;
	created_at: Date;
	content: string;
	like_count: number;
	comment_count: number;
	save_count: number;
	user_id: string;
}

export interface PostModelDTO {
	id?: number;
	created_at?: Date;
	content: string;
	like_count?: number;
	comment_count?: number;
	save_count?: number;
	user_id: string;
}
