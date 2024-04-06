import { Request, Response } from 'express';
import { CommentModel } from '../../models/CommentModel';
import {
	createCommentRepository,
	deleteCommentRepository,
	readCommentRepository,
	readCommentsByUserRepository,
	readCommentsRepository,
	updateCommentRepository,
} from '../repositories/commentRepository';

export const createComment = async (req: Request, res: Response) => {
	const comment = req.body as CommentModel;
	try {
		const id = await createCommentRepository(comment);

		const response = await readCommentRepository(id);

		res.status(201).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readComment = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const response = await readCommentRepository(id);
		if (!response) {
			res.status(404).send('Comment not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readComments = async (req: Request, res: Response) => {
	try {
		let response;
		const user_id = req.query.user_id as string;

		if (user_id) {
			response = await readCommentsByUserRepository(user_id);
		} else {
			response = await readCommentsRepository();
		}

		if (!response) {
			res.status(200).send('No comments found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const updateComment = async (req: Request, res: Response) => {
	const id = req.params.id;
	const comment = req.body as CommentModel;

	try {
		let response = await readCommentRepository(id);
		if (!response) {
			res.status(404).send('Comment not found');
			return;
		}

		if (comment.id !== response.id) {
			res.status(403).send('Comment ID mismatch: Forbidden');
			return;
		}

		if (comment.user_id !== response.user_id) {
			res.status(403).send('User ID mismatch: Forbidden');
			return;
		}

		if (comment.post_id !== response.post_id) {
			res.status(403).send('Post ID mismatch: Forbidden');
			return;
		}

		if (comment.created_at !== response.created_at) {
			res.status(403).send('Creation date mismatch: Forbidden');
			return;
		}

		await updateCommentRepository(id, comment);
		response = await readCommentRepository(id);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const response = await readCommentRepository(id);
		if (!response) {
			res.status(404).send('Comment not found');
			return;
		}

		await deleteCommentRepository(id);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};
