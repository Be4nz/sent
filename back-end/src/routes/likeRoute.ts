import { Router } from 'express';
import { checkOwnership } from '../middlewares/authentication';
import { createLike, deleteLike, readLike, readLikers, readLiking } from '../APIs/controllers';

export const likeRouter = Router();

likeRouter.post('/', checkOwnership('likes'), createLike);

likeRouter.get('/', checkOwnership('likes'), readLike);

likeRouter.get('/likers', readLikers);

likeRouter.get('/liking', readLiking);

likeRouter.delete('/', checkOwnership('likes'), deleteLike);
