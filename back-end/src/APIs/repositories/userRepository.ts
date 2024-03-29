import knexConnection from '../../database/knex';
import { UserModel } from '../../models';

export const createUserRepository = async (user: UserModel) => {
	const response = await knexConnection('users').insert(user);
	return response;
};

export const readUserByIdRepository = async (id: string) => {
	const response = await knexConnection('users').select().where('id', id).limit(1);
	return response[0] as UserModel;
};

export const readUserByAuth0IdRepository = async (auth0_id: string) => {
	const response = await knexConnection('users').select().where('auth0_id', auth0_id).limit(1);
	return response[0] as UserModel;
};

export const readUserByUsernameRepository = async (username: string) => {
	const response = await knexConnection('users').select().where('username', username).limit(1);
	return response[0] as UserModel;
};

export const readUsersRepository = async () => {
	const response = await knexConnection('users').select();
	return response as UserModel[];
};

export const updateUserRepository = async (id: string, user: UserModel) => {
	await knexConnection('users').update(user).where('id', id);
};

export const deleteUserRepository = async (id: string) => {
	await knexConnection('users').where('id', id).del();
};

export const incrementFollowersRepository = async (id: string) => {
	await knexConnection('users').where('id', id).increment('followers', 1);
};

export const decrementFollowersRepository = async (id: string) => {
	await knexConnection('users').where('id', id).decrement('followers', 1);
};

export const incrementFollowingRepository = async (id: string) => {
	await knexConnection('users').where('id', id).increment('following', 1);
};

export const decrementFollowingRepository = async (id: string) => {
	await knexConnection('users').where('id', id).decrement('following', 1);
};
