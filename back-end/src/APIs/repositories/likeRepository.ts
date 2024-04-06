import knexConnection from '../../database/knex';
import { LikeModel } from '../../models/likeModel';

export const createLikeRepository = async (like: LikeModel) => {
	await knexConnection('likes').insert(like);
};

export const readLikeRepository = async (user_id: string, post_id: string) => {
	const response = await knexConnection('likes')
		.select()
		.where('user_id', user_id)
		.andWhere('post_id', post_id)
		.limit(1);
	return response[0] as LikeModel;
};

export const readLikersRepository = async (post_id: string) => {
	const response = await knexConnection('likes').select('user_id').where('post_id', post_id);
	return response as LikeModel[];
};

export const readLikingRepository = async (user_id: string) => {
	const response = await knexConnection('likes').select('post_id').where('user_id', user_id);
	return response as LikeModel[];
};

export const deleteLikeRepository = async (user_id: string, post_id: string) => {
	await knexConnection('likes').where('user_id', user_id).andWhere('post_id', post_id).del();
};
