import { Router } from 'express';
import { createUser, deleteUser, readUser, readUserAuth0, readUsers, updateUser } from '../APIs/controllers';
import { checkAdminOrOwn, checkRole } from '../middlewares/authentication';

export const userRouter = Router();

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
 *               $ref: '#/components/schemas/User'
 *       '403':
 *         description: Unauthorized access. You do not have permission to post this user.
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal Server Error
 */
userRouter.post('/', checkAdminOrOwn(), createUser);

/**
 * @swagger
 * /users/auth0/{auth0_id}:
 *   get:
 *     tags:
 *      - Users
 *     summary: Get user by ID
 *     description: Retrieve user information by ID. This endpoint is only accessible to administrators or the users themselves.
 *     parameters:
 *       - in: path
 *         name: auth0_id
 *         required: true
 *         description: auth0_id of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '403':
 *         description: Unauthorized access. You do not have permission to get this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.get('/auth0/:auth0_id', checkAdminOrOwn(), readUserAuth0);

/**
 * @swagger
 * /users/{id}:
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
 *               $ref: '#/components/schemas/User'
 *       '403':
 *         description: Unauthorized access. You do not have permission to get this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.get('/:id', checkAdminOrOwn(), readUser);

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
 *                 $ref: '#/components/schemas/User'
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '403':
 *         description: Forbidden. You do not have permission to update this user or trying to update non-updatable fields like `id`, `auth0_id`, `role` (there are exceptions) or `created_at`.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.put('/:id', checkAdminOrOwn(), updateUser);

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
 *               $ref: '#/components/schemas/User'
 *       '403':
 *         description: Unauthorized access. You do not have permission to delete this user.
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
userRouter.delete('/:id', checkAdminOrOwn(), deleteUser);
