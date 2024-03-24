import { Request, Response } from 'express';
import { PostModel } from '../../models';
import {
	createPostRepository,
	readPostRepository,
	readPostsRepository,
	readPostsByUserRepository,
	deletePostRepository,
	updatePostRepository,
} from '../repositories/postRepository';

export const createPost = async (req: Request, res: Response) => {
	const post = req.body as PostModel;
	try {
		const id = await createPostRepository(post);

		const response = await readPostRepository(id);

		res.status(201).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readPost = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const response = await readPostRepository(id);
		if (!response) {
			res.status(404).send('Post not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readPosts = async (req: Request, res: Response) => {
	try {
		let response;
		const user_id = req.query.user_id as string;

		if (user_id) {
			response = await readPostsByUserRepository(user_id);
		} else {
			response = await readPostsRepository();
		}

		if (!response) {
			res.status(200).send('No posts found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const updatePost = async (req: Request, res: Response) => {
	const id = req.params.id;
	const post = req.body as PostModel;

	try {
		let response = await readPostRepository(id);
		if (!response) {
			res.status(404).send('Post not found');
			return;
		}

		if (post.id !== response.id) {
			res.status(403).send('Post ID mismatch: Forbidden');
			return;
		}

		if (post.user_id !== response.user_id) {
			res.status(403).send('User ID mismatch: Forbidden');
			return;
		}

		if (post.created_at !== response.created_at) {
			res.status(403).send('Creation date mismatch: Forbidden');
			return;
		}

		await updatePostRepository(id, post);
		response = await readPostRepository(id);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const deletePost = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const response = await readPostRepository(id);
		if (!response) {
			res.status(404).send('Post not found');
			return;
		}

		await deletePostRepository(id);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};
