import { Router } from 'express';
import {
	createCommentLike,
	deleteCommentLike,
	readCommentLike,
	readCommentLikers,
	readCommentLiking,
	readCommentLikeCount,
} from '../APIs/controllers';
import { checkOwnership } from '../middlewares';

export const commentLikeRouter = Router();

commentLikeRouter.post('/', createCommentLike);

commentLikeRouter.get('/', readCommentLike);

commentLikeRouter.get('/likers', readCommentLikers);

commentLikeRouter.get('/liking', readCommentLiking);

commentLikeRouter.delete('/', checkOwnership('comment_likes'), deleteCommentLike);

commentLikeRouter.get('/count', readCommentLikeCount);
