import knexConnection from '../../database/knex';
import { CommentModel } from '../../models';

export const createCommentRepository = async (comment: CommentModel) => {
	const response = await knexConnection('comments').insert(comment);
	return response[0];
};

export const readCommentRepository = async (id: string) => {
	const response = await knexConnection('comments').select().where('id', id).limit(1);
	return response[0] as CommentModel;
};

export const readCommentsRepository = async () => {
	const response = await knexConnection('comments').select().orderBy('created_at', 'desc');
	return response as CommentModel[];
};

export const readCommentsByPostRepository = async (post_id: string) => {
	const response = await knexConnection('comments').select().where('post_id', post_id).orderBy('created_at', 'desc');
	return response as CommentModel[];
};

export const updateCommentRepository = async (id: string, comment: CommentModel) => {
	await knexConnection('comments').update(comment).where('id', id);
};

export const deleteCommentRepository = async (id: string) => {
	await knexConnection('comments').where('id', id).del();
};
