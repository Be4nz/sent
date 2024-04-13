import { Request, Response } from 'express';
import {
	createSaveRepository,
	readSaveRepository,
	readUserSavesRepository,
	deleteSaveRepository,
} from '../repositories/saveRepository';
import { decrementSavesRepository, incrementSavesRepository } from '../repositories';
import { SaveModel } from '../../models/saveModel';

export const createSave = async (req: Request, res: Response) => {
	const save = req.body as SaveModel;
	try {
		if (save.post_id && save.user_id) {
			let response = await readSaveRepository(save.user_id, save.post_id);
			if (response) {
				res.status(409).send('Save already exists');
				return;
			}
			await createSaveRepository(save);
			response = await readSaveRepository(save.user_id, save.post_id);
			await incrementSavesRepository(save.post_id);
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

export const readSave = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const post_id = req.query.post_id as string;

	try {
		let response;
		if (user_id && post_id) {
			response = await readSaveRepository(user_id, post_id);
		}

		if (!response) {
			res.status(404).send('Save not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUserSaves = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;

	try {
		let response;
		if (user_id) {
			response = await readUserSavesRepository(user_id);
		}

		if (!response) {
			res.status(404).send('Saves not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const deleteSave = async (req: Request, res: Response) => {
	const user_id = req.query.user_id as string;
	const post_id = req.query.post_id as string;

	try {
		if (!user_id || !post_id) {
			res.status(404).send('Save not found');
			return;
		}

		const response = await readSaveRepository(user_id, post_id);
		if (!response) {
			res.status(404).send('Save not found');
			return;
		}

		await deleteSaveRepository(user_id, post_id);
		await decrementSavesRepository(post_id);
		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};
