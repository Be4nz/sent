import { Router } from 'express';
import { checkOwnership } from '../middlewares/authentication';
import { createLike, deleteLike, readLike, readLikers, readLiking } from '../APIs/controllers/likeController';

export const likeRouter = Router();

likeRouter.post('/', createLike);

likeRouter.get('/', readLike);

likeRouter.get('/likers', readLikers);

likeRouter.get('/liking', readLiking);

likeRouter.delete('/', checkOwnership('likes'), deleteLike);
