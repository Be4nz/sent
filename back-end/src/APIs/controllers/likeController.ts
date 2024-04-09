import { Request, Response } from 'express';
import { FollowModel } from '../../models';
import { decrementLikesRepository, incrementLikesRepository, readFollowRepository } from '../repositories';
import {
	createLikeRepository,
	deleteLikeRepository,
	readLikeRepository,
	readLikersRepository,
	readLikingRepository,
} from '../repositories/likeRepository';
import { LikeModel } from '../../models';

export const createLike = async (req: Request, res: Response) => {
	const like = req.body as LikeModel;
	try {
		if (like.post_id && like.user_id) {
			let response = await readFollowRepository(like.user_id, like.post_id);
			if (response) {
				res.status(409).send('Like already exists');
				return;
			}
			await createLikeRepository(like);
			response = await readFollowRepository(like.user_id, like.post_id);
			await incrementLikesRepository(like.post_id);
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

export const readLike = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const post_id = req.query.post_id as string;

	try {
		let response;
		if (user_id && post_id) {
			response = await readLikeRepository(user_id, post_id);
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

export const readLiking = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;

	try {
		let response;
		if (user_id) {
			response = await readLikingRepository(user_id);
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

export const readLikers = async (req: Request, res: Response) => {
	const post_id = req.query.post_id as string;

	try {
		let response;
		if (post_id) {
			response = await readLikersRepository(post_id);
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

export const deleteLike = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const post_id = req.query.post_id as string;

	try {
		if (!user_id || !post_id) {
			res.status(404).send('Like not found');
			return;
		}

		const response = await readLikeRepository(user_id, post_id);
		if (!response) {
			res.status(404).send('Like not found');
			return;
		}

		await deleteLikeRepository(user_id, post_id);
		await decrementLikesRepository(post_id);
		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};
