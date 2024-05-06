import knexConnection from '../../database/knex';
import { FollowModel, PaginatedModel, PostModel } from '../../models';
import { SaveModel } from '../../models/saveModel';

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

export const readPostsPaginatedRepository = async (page: number, limit: number) => {
	const response = await knexConnection('posts')
		.select()
		.orderBy('created_at', 'desc')
		.paginate({ perPage: limit, currentPage: page, isLengthAware: true });
	return response as PaginatedModel<PostModel>;
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

export const readPostsSavedRepository = async (saved: SaveModel[]) => {
	const response = await knexConnection('posts')
		.select()
		.whereIn(
			'id',
			saved.map((entry) => entry.post_id)
		)
		.orderBy('created_at', 'desc');
	return response as PostModel[];
};

export const readPostsByUserRepository = async (user_id: string) => {
	const response = await knexConnection('posts').select().where('user_id', user_id).orderBy('created_at', 'desc');
	return response as PostModel[];
};

export const updatePostRepository = async (id: string, post: PostModel) => {
	await knexConnection('posts').update(post).where('id', id);
};

export const deletePostRepository = async (id: string) => {
	await knexConnection('posts').where('id', id).del();
};

export const incrementLikesRepository = async (id: string) => {
	await knexConnection('posts').where('id', id).increment('like_count', 1);
};

export const decrementLikesRepository = async (id: string) => {
	await knexConnection('posts').where('id', id).decrement('like_count', 1);
};

export const deletePostRepositoryByContent = async (content: string) => {
	await knexConnection('posts').where('content', content).del();
};

export const incrementCommentsRepository = async (id: string) => {
	await knexConnection('posts').where('id', id).increment('comment_count', 1);
};

export const decrementCommentsRepository = async (id: string) => {
	await knexConnection('posts').where('id', id).decrement('comment_count', 1);
};

export const incrementSavesRepository = async (id: string) => {
	await knexConnection('posts').where('id', id).increment('save_count', 1);
};

export const decrementSavesRepository = async (id: string) => {
	await knexConnection('posts').where('id', id).decrement('save_count', 1);
};
