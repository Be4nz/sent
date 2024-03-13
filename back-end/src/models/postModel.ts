export interface PostModel {
	id?: string;
	created_at?: Date;
    content: string;
    like_count?: number;
    comment_count?: number;
    save_count?: number;
    user_id: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PostModel:
 *       type: object
 *       required:
 *         - content
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the post.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The creation date of the post.
 *         content:
 *           type: string
 *           description: The content of the post.
 *         like_count:
 *           type: number
 *           description: The number of likes the post has received.
 *         comment_count:
 *           type: number
 *           description: The number of comments the post has received.
 *         save_count:
 *           type: number
 *           description: The number of times the post has been saved.
 *         user_id:
 *           type: string
 *           description: The ID of the user who created the post.
 *       example:
 *         id: 1
 *         created_at: "2024-01-01T00:00:00.000Z"
 *         content: This is the content of the post.
 *         like_count: 10
 *         comment_count: 5
 *         save_count: 3
 *         user_id: f47ac10b-58cc-4372-a567-0e02b2c3d479
 */

