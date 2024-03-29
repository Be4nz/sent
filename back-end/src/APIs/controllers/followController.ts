import { Request, Response } from 'express';
import { FollowModel } from '../../models';
import {
	createFollowRepository,
	decrementFollowersRepository,
	decrementFollowingRepository,
	deleteFollowRepository,
	incrementFollowersRepository,
	incrementFollowingRepository,
	readFollowRepository,
	readFollowersRepository,
	readFollowingRepository,
	readFollowsRepository,
} from '../repositories';

export const createFollow = async (req: Request, res: Response) => {
	const follow = req.body as FollowModel;
	try {
		let response = await readFollowRepository(follow.user_id, follow.follower_id);
		if (response) {
			res.status(409).send('Follow already exists');
			return;
		}

		await createFollowRepository(follow);
		response = await readFollowRepository(follow.user_id, follow.follower_id);
		await incrementFollowersRepository(follow.user_id);
		await incrementFollowingRepository(follow.follower_id);
		res.status(201).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readFollow = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const follower_id = req.query.follower_id as string;

	try {
		let response;
		if (user_id && follower_id) {
			response = await readFollowRepository(user_id, follower_id);
		} else if (follower_id) {
			response = await readFollowingRepository(follower_id);
		} else if (user_id) {
			response = await readFollowersRepository(user_id);
		} else {
			response = await readFollowsRepository();
		}

		if (!response) {
			res.status(404).send('Follow not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const deleteFollow = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const follower_id = req.query.follower_id as string;

	try {
		if (!user_id || !follower_id) {
			res.status(404).send('Follow not found');
			return;
		}

		const response = await readFollowRepository(user_id, follower_id);
		if (!response) {
			res.status(404).send('Follow not found');
			return;
		}

		await deleteFollowRepository(user_id, follower_id);
		await decrementFollowersRepository(user_id);
		await decrementFollowingRepository(follower_id);
		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};
