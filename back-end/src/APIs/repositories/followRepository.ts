import knexConnection from '../../database/knex';
import { FollowModel } from '../../models';

export const createFollowRepository = async (follow: FollowModel) => {
	await knexConnection('follows').insert(follow);
};

export const readFollowRepository = async (user_id: string, follower_id: string) => {
	const response = await knexConnection('follows')
		.select()
		.where('user_id', user_id)
		.andWhere('follower_id', follower_id)
		.limit(1);
	return response[0] as FollowModel;
};

export const readFollowsRepository = async () => {
	const response = await knexConnection('follows').select();
	return response as FollowModel[];
};

export const readFollowersRepository = async (user_id: string) => {
	const response = await knexConnection('follows').select('follower_id').where('user_id', user_id);
	return response as FollowModel[];
};

export const readFollowingRepository = async (follower_id: string) => {
	const response = await knexConnection('follows').select('user_id').where('follower_id', follower_id);
	return response as FollowModel[];
};

export const deleteFollowRepository = async (user_id: string, follower_id: string) => {
	await knexConnection('follows').where('user_id', user_id).andWhere('follower_id', follower_id).del();
};
