import { Router } from 'express';
import { checkOwnership } from '../middlewares/authentication';
import {
	createComment,
	deleteComment,
	readComment,
	readCommentsByPostId,
	updateComment,
} from '../APIs/controllers/commentController';

export const commentRouter = Router();

commentRouter.post('/', checkOwnership('comments'), createComment);

commentRouter.get('/:id', readComment);

commentRouter.get('/of/:id', readCommentsByPostId);

commentRouter.put('/:id', checkOwnership('comments'), updateComment);

commentRouter.delete('/:id', checkOwnership('comments'), deleteComment);
