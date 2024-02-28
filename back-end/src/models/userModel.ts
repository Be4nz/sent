export interface User {
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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - auth0_id
 *        - username
 *        - name
 *        - email
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the user.
 *         auth0_id:
 *           type: string
 *           description: The Auth0 identifier of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         description:
 *           type: string
 *           description: The description of the user profile.
 *         role:
 *           type: string
 *           description: The role of the user.
 *         picture:
 *           type: string
 *           description: The profile picture of the user.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The creation date of the user.
 *         followers:
 *           type: number
 *           description: The number of followers of the user.
 *         following:
 *           type: number
 *           description: The number of users the user is following.
 *       example:
 *         id: f47ac10b-58cc-4372-a567-0e02b2c3d479
 *         auth_id: auth0|1234567890
 *         username: JohnDoe
 *         name: John Doe
 *         email: johndoe@gmail.com
 *         description: This is John Doe personal profile.
 *         role: user
 *         picture: https://example.com/picture.jpg
 *         created_at: "2024-01-01T00:00:00.000Z"
 *         followers: 0
 *         following: 0
 */
