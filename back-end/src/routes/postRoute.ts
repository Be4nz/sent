import { Router } from 'express';
import {
	createPost,
	deletePost,
	readPost,
	readPosts,
	updatePost,
	readPostsFollowing,
	readPostsSaved,
} from '../APIs/controllers/postController';
import { checkOwnership } from '../middlewares/authentication';

export const postRouter = Router();

postRouter.get('/following/', readPostsFollowing);

postRouter.get('/saved/', readPostsSaved);

postRouter.get('/:id', readPost);

postRouter.post('/', checkOwnership('posts'), createPost);

postRouter.put('/:id', checkOwnership('posts'), updatePost);

postRouter.delete('/:id', deletePost);

postRouter.get('/:page/:limit/', readPosts);

postRouter.get('/', readPosts);
