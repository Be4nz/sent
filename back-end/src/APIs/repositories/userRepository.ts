import knexConnection from '../../database/knex';
import { FollowModel, UserModel } from '../../models';
import { PaginatedModel } from '../../models/paginatedModel';

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

export const readUserFollowingProfilesPaginatedRepository = async (
	follower_id: string,
	page: number,
	limit: number
) => {
	const followedUserIds = (await knexConnection('follows')
		.select('user_id')
		.where('follower_id', follower_id)
		.paginate({ perPage: limit, currentPage: page, isLengthAware: true })
		.then((response: PaginatedModel<FollowModel>) => response.data.map((entry) => entry.user_id))) as string[];

	const response = await knexConnection('users').select().whereIn('id', followedUserIds);
	return response as UserModel[];
};

export const readUserFollowerProfilesPaginatedRepository = async (user_id: string, page: number, limit: number) => {
	const followersUserIds = (await knexConnection('follows')
		.select('follower_id')
		.where('user_id', user_id)
		.paginate({ perPage: limit, currentPage: page, isLengthAware: true })
		.then((response: PaginatedModel<FollowModel>) => response.data.map((entry) => entry.follower_id))) as string[];

	const response = await knexConnection('users').select().whereIn('id', followersUserIds);
	return response as UserModel[];
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

export const deleteUserByUsernameRepository = async (username: string) => {
	await knexConnection('users').where('username', username).del();
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
