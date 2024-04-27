import knexConnection from '../../database/knex';
import { CommentLikeModel } from '../../models';

export const createCommentLikeRepository = async (like: CommentLikeModel) => {
	await knexConnection('comment_likes').insert(like);
};

export const readCommentLikeRepository = async (user_id: string, comment_id: string) => {
	const response = await knexConnection('comment_likes')
		.select()
		.where('user_id', user_id)
		.andWhere('comment_id', comment_id)
		.limit(1);
	return response[0] as CommentLikeModel;
};

export const readCommentLikersRepository = async (comment_id: string) => {
	const response = await knexConnection('comment_likes').select('user_id').where('comment_id', comment_id);
	return response as CommentLikeModel[];
};

export const readCommentLikingRepository = async (user_id: string) => {
	const response = await knexConnection('comment_likes').select('comment_id').where('user_id', user_id);
	return response as CommentLikeModel[];
};

export const readCommentLikeCountRepository = async (comment_id: string) => {
	const response = await knexConnection('comment_likes').count('user_id').where('comment_id', comment_id);
	return response as Number;
};

export const deleteCommentLikeRepository = async (comment_id: string, user_id: string) => {
	await knexConnection('comment_likes').where('comment_id', comment_id).andWhere('user_id', user_id).del();
};
