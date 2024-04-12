import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { readUserByIdRepository, readUserByUsernameRepository } from '../APIs/repositories';
import { FollowModel, LikeModel, PostModel, CommentModel } from '../models';
import { readPostRepository } from '../APIs/repositories/postRepository';
import { readCommentRepository } from '../APIs/repositories/commentRepository';
require('dotenv').config();

export const verifyJwt = auth({
	audience: process.env.AUTH0_AUDIENCE,
	issuerBaseURL: process.env.AUTH0_ISSUER,
	tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
	jwksUri: process.env.AUTH0_JWKS_URI,
});

export const checkRole = (role: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const authPayload = req.auth?.payload;
		if (!authPayload || !authPayload.role || authPayload.role !== role) {
			res.status(403).send('Unauthorized access');
			return;
		}
		next();
	};
};

export const checkOwnership = (resourceType: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authPayload = req.auth?.payload;

		if (authPayload?.role === 'admin') {
			return next();
		}

		try {
			let isOwner = false;
			const id = req.params.id;
			switch (resourceType) {
				case 'users':
					const auth0_id = req.params.auth0_id;
					const username = req.params.username;

					if (auth0_id) {
						isOwner = auth0_id === authPayload?.sub;
					} else if (username) {
						const user = await readUserByUsernameRepository(username);
						isOwner = user.auth0_id === authPayload?.sub;
					} else if (id) {
						const user = await readUserByIdRepository(id);
						isOwner = user.auth0_id === authPayload?.sub;
					}
					break;
				case 'posts':
					const post = req.body as PostModel;

					if (post) {
						const user = await readUserByIdRepository(post.user_id);
						isOwner = user.auth0_id === authPayload?.sub;
					} else if (id) {
						const post = await readPostRepository(id);
						const user = await readUserByIdRepository(post.user_id);
						isOwner = user.auth0_id === authPayload?.sub;
					}
					break;
				case 'follows':
					const follow = req.body as FollowModel;
					const follower_id = req.query.follower_id as string;

					if (follower_id) {
						const user = await readUserByIdRepository(follower_id);
						isOwner = user.auth0_id === authPayload?.sub;
					} else if (follow) {
						const user = await readUserByIdRepository(follow.follower_id);
						isOwner = user.auth0_id === authPayload?.sub;
					}
					break;
				case 'likes':
					const like = req.body as LikeModel;
					const user_id = req.query.user_id as string;

					if (user_id) {
						const user = await readUserByIdRepository(user_id);
						isOwner = user.auth0_id === authPayload?.sub;
					} else if (like) {
						const user = await readUserByIdRepository(like.user_id);
					}
					break;
				case 'comments':
					const comment = req.body as CommentModel;

					if (comment) {
						const user = await readUserByIdRepository(comment.user_id);
						isOwner = user.auth0_id === authPayload?.sub;
					} else if (id) {
						const comment = await readCommentRepository(id);
						const user = await readUserByIdRepository(comment.user_id);
						isOwner = user.auth0_id === authPayload?.sub;
					}
					break;
				default:
					break;
			}

			if (isOwner) {
				return next();
			}

			throw new Error('Unauthorized access');
		} catch (error) {
			console.log(error);
			res.status(403).send('Unauthorized access');
		}
	};
};
