export interface CommentModel {
	id?: number;
	created_at?: Date;
	content: string;
	user_id: string;
	post_id: string;
}
