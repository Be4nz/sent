import { Router } from 'express';
import {
	createUser,
	deleteUser,
	readUserById,
	readUserByAuth0Id,
	readUsers,
	updateUser,
	readUserProfile,
	readUserByUsername,
	readUserFollowProfilesPaginated,
} from '../APIs/controllers';
import { checkOwnership, checkRole } from '../middlewares/authentication';

export const userRouter = Router();

userRouter.get('/follow/profile/:page/:limit/', readUserFollowProfilesPaginated);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *      - Users
 *     summary: Create a new user
 *     description: Registers a new user account in the application. This endpoint is only accessible to administrators or the users themselves.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             auth_id: auth0|1234567890
 *             username: JohnDoe
 *             name: John Doe
 *             email: johndoe@gmail.com
 *     responses:
 *       201:
 *         description: The newly created user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       '403':
 *         description: Unauthorized access. You do not have permission to post this user.
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */
userRouter.post('/:auth0_id', checkOwnership('users'), createUser);

/**
 * @swagger
 * /users/id/{id}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get user by ID
 *     description: Retrieve user information by ID. This endpoint is only accessible to administrators or the users themselves.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       '403':
 *         description: Unauthorized access. You do not have permission to get this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.get('/id/:id', checkOwnership('users'), readUserById);

/**
 * @swagger
 * /users/auth0_id/{auth0_id}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get user by Auth0 ID
 *     description: Retrieve user information by Auth0 ID. This endpoint is only accessible to administrators or the users themselves.
 *     parameters:
 *       - in: path
 *         name: auth0_id
 *         required: true
 *         description: Auth0 ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       '403':
 *         description: Unauthorized access. You do not have permission to get this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.get('/auth0_id/:auth0_id', checkOwnership('users'), readUserByAuth0Id);

/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get user by ID
 *     description: Retrieve user information by ID. This endpoint is accessible to everyone who is logged user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *             example:
 *               id: f47ac10b-58cc-4372-a567-0e02b2c3d479
 *               auth_id: hidden
 *               username: JohnDoe
 *               name: John Doe
 *               description: This is John Doe personal profile.
 *               email: hidden
 *               role: hidden
 *               picture: https://www.example.com/picture.jpg
 *               created_at: 2024-01-01T00:00:00.000Z
 *               followers: 2
 *               following: 3
 *       '403':
 *         description: Unauthorized access. You do not have permission to get this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.get('/profile/:id', readUserProfile);

userRouter.get('/profile/username/:username', readUserByUsername);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get all users
 *     description: Retrieve all users. This endpoint is only accessible to administrators.
 *     responses:
 *       '200':
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserModel'
 *       '204':
 *         description: No users found
 *       '403':
 *         description: Unauthorized access. You do not have permission to get users.
 *       '500':
 *         description: Internal server error
 */
userRouter.get('/', checkRole('admin'), readUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     description: Update a user's information. This endpoint is only accessible to administrators or the users themselves.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserModel'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       '403':
 *         description: Forbidden. You do not have permission to update this user or trying to update non-updatable fields like `id`, `auth0_id`, `role` (there are exceptions) or `created_at`.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.put('/:id', checkOwnership('users'), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Delete a user by ID. This endpoint is only accessible to administrators or the users themselves.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserModel'
 *       '403':
 *         description: Unauthorized access. You do not have permission to delete this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.delete('/:id', checkOwnership('users'), deleteUser);
