import knexConnection from '../../database/knex';
import { FollowModel, PostModel } from '../../models';

export const createPostRepository = async (post: PostModel) => {
	const response = await knexConnection('posts').insert(post);
	return response[0];
};

export const readPostRepository = async (id: string) => {
	const response = await knexConnection('posts').select().where('id', id).limit(1);
	return response[0] as PostModel;
};

export const readPostsRepository = async () => {
	const response = await knexConnection('posts').select().orderBy('created_at', 'desc');
	return response as PostModel[];
};

export const readPostsFollowingRepository = async (following: FollowModel[]) => {
	const response = await knexConnection('posts')
		.select()
		.whereIn(
			'user_id',
			following.map((entry) => entry.user_id)
		)
		.orderBy('created_at', 'desc');
	return response as PostModel[];
};

export const readPostsByUserRepository = async (user_id: string) => {
	const response = await knexConnection('posts').select().where('user_id', user_id).orderBy('created_at', 'desc');
	return response as PostModel[];
};

export const updatePostRepository = async (id: string, post: PostModel) => {
	await knexConnection('users').update(post).where('id', id);
};

export const deletePostRepository = async (id: string) => {
	await knexConnection('users').where('id', id).del();
};
