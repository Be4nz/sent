import { Router } from "express";
import { createUser, deleteUser, readUser, readUsers, updateUser } from "../APIs/controllers";
import { checkAdminOrOwn, checkRole } from "../middlewares/authentication";

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
userRouter.get('/:id',checkAdminOrOwn(), readUser);

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
userRouter.get('/', checkRole("admin"), readUsers);

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
 *         role: user
 *         picture: https://example.com/picture.jpg
 *         created_at: "2024-01-01T00:00:00.000Z"
 *         followers: 0
 *         following: 0
 */