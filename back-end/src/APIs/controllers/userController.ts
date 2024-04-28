import { Request, Response } from 'express';
import { UserModel } from '../../models';
import {
	createUserRepository,
	deleteUserRepository,
	deleteUserByUsernameRepository,
	readUserByIdRepository,
	readUserByAuth0IdRepository,
	readUsersRepository,
	updateUserRepository,
	readUserByUsernameRepository,
	readUserFollowerProfilesPaginatedRepository,
	readUserFollowingProfilesPaginatedRepository,
	readUsersBySearchRepository,
	readAllSearchUsersRepository,
} from '../repositories';

export const createUser = async (req: Request, res: Response) => {
	const user = req.body as UserModel;
	try {
		let response = await readUserByAuth0IdRepository(user.auth0_id);
		if (response) {
			res.status(409).send('User already exists');
			return;
		}

		await createUserRepository(user);
		response = await readUserByAuth0IdRepository(user.auth0_id);
		res.status(201).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUserById = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const response = await readUserByIdRepository(id);
		if (!response) {
			res.status(404).send('User not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUserByAuth0Id = async (req: Request, res: Response) => {
	const auth0_id = req.params.auth0_id;
	try {
		const response = await readUserByAuth0IdRepository(auth0_id);
		if (!response) {
			res.status(404).send('User not found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUserProfile = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const response = await readUserByIdRepository(id);
		if (!response) {
			res.status(404).send('User not found');
			return;
		}

		response.auth0_id = 'hidden';
		response.email = 'hidden';
		response.role = 'hidden';

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUserFollowProfilesPaginated = async (req: Request, res: Response) => {
	const page = parseInt(req.params.page as string);
	const limit = parseInt(req.params.limit as string);
	const user_id = req.query.user_id as string;
	const follower_id = req.query.follower_id as string;

	try {
		let response: UserModel[] = [];
		if (follower_id) {
			response = await readUserFollowingProfilesPaginatedRepository(follower_id, page, limit);
		} else if (user_id) {
			response = await readUserFollowerProfilesPaginatedRepository(user_id, page, limit);
		}

		if (response.length === 0) {
			res.status(404).send('Users not found');
			return;
		}

		response.map((user) => {
			user.auth0_id = 'hidden';
			user.email = 'hidden';
			user.role = 'hidden';
		});

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUserByUsername = async (req: Request, res: Response) => {
	const username = req.params.username;
	try {
		const response = await readUserByUsernameRepository(username);
		if (!response) {
			res.status(404).send('User not found');
			return;
		}

		response.auth0_id = 'hidden';
		response.email = 'hidden';
		response.role = 'hidden';

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUsers = async (req: Request, res: Response) => {
	try {
		const response = await readUsersRepository();
		if (!response) {
			res.status(200).send('No users found');
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const user = req.body as UserModel;
	const authPayload = req.auth?.payload;
	try {
		let response = await readUserByIdRepository(id);
		if (!response) {
			res.status(404).send('User not found');
			return;
		}

		// Check if the user is trying to update their own id, auth0_id, role or created_at and forbid it.
		// Role is updatable in the auth0 dashboard. Then it enables api to also update when using updateUser.
		// Id, auth0_id and created_at is not updatable.

		if (user.id && response.id !== user.id) {
			res.status(403).send('User ID mismatch: Forbidden');
			return;
		}

		if (user.auth0_id && response.auth0_id !== user.auth0_id) {
			res.status(403).send('Auth0 ID mismatch: Forbidden');
			return;
		}

		if (authPayload && authPayload.role === response.role) {
			if (user.role && response.role !== user.role) {
				res.status(403).send('Role mismatch: Forbidden');
				return;
			}
		}

		if (user.created_at && response.created_at !== user.created_at) {
			res.status(403).send('Creation date mismatch: Forbidden');
			return;
		}

		await updateUserRepository(id, user);
		response = await readUserByIdRepository(id);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const response = await readUserByIdRepository(id);
		if (!response) {
			res.status(404).send('User not found');
			return;
		}

		await deleteUserRepository(id);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const deleteUserByUsername = async (req: Request, res: Response) => {
	const username = req.params.username;
	try {
		const response = await readUserByUsernameRepository(username);
		if (!response) {
			res.status(404).send('User not found');
			return;
		}

		await deleteUserByUsernameRepository(username);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readUserSearch = async (req: Request, res: Response) => {
	const search = req.params.search;
	try {
		const response = await readUsersBySearchRepository(search);
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};

export const readAllUserSearch = async (req: Request, res: Response) => {
	try {
		const response = await readAllSearchUsersRepository();
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal Server Error');
	}
};
