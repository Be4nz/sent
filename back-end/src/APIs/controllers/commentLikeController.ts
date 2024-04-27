import { Request, Response } from 'express';
import {
	createCommentLikeRepository,
	deleteCommentLikeRepository,
	readCommentLikeRepository,
	readCommentLikersRepository,
	readCommentLikingRepository,
	readCommentLikeCountRepository,
} from '../repositories/commentLikeRepository';
import { CommentLikeModel } from '../../models';

export const createCommentLike = async (req: Request, res: Response) => {
	const like = req.body as CommentLikeModel;
	try {
		if (like.comment_id && like.user_id) {
			let response = await readCommentLikeRepository(like.user_id, like.comment_id);
			if (response) {
				res.status(409).send('Like already exists');
				return;
			}
			await createCommentLikeRepository(like);
			response = await readCommentLikeRepository(like.user_id, like.comment_id);

			res.status(201).json(response);
		} else {
			res.status(404).send('Missing details');
			return;
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readCommentLike = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const comment_id = req.query.comment_id as string;

	try {
		let response;
		if (user_id && comment_id) {
			response = await readCommentLikeRepository(user_id, comment_id);
		}

		if (!response) {
			res.status(404).send('Like not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readCommentLiking = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;

	try {
		let response;
		if (user_id) {
			response = await readCommentLikingRepository(user_id);
		}

		if (!response) {
			res.status(404).send('Likes not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readCommentLikers = async (req: Request, res: Response) => {
	const comment_id = req.query.comment_id as string;

	try {
		let response;
		if (comment_id) {
			response = await readCommentLikersRepository(comment_id);
		}

		if (!response) {
			res.status(404).send('Likes not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readCommentLikeCount = async (req: Request, res: Response) => {
	const comment_id = req.query.comment_id as string;

	try {
		let response;
		if (comment_id) {
			response = await readCommentLikeCountRepository(comment_id);
		}

		if (!response) {
			res.status(404).send('Likes not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const deleteCommentLike = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const comment_id = req.query.comment_id as string;

	try {
		if (!user_id || !comment_id) {
			res.status(404).send('Like not found');
			return;
		}

		const response = await readCommentLikeRepository(user_id, comment_id);
		if (!response) {
			res.status(404).send('Like not found');
			return;
		}

		await deleteCommentLikeRepository(comment_id, user_id);

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};
