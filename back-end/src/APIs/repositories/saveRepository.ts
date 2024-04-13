import knexConnection from '../../database/knex';
import { SaveModel } from '../../models/saveModel';

export const createSaveRepository = async (save: SaveModel) => {
	await knexConnection('saves').insert(save);
};

export const readSaveRepository = async (user_id: string, post_id: string) => {
	const response = await knexConnection('saves')
		.select()
		.where('user_id', user_id)
		.andWhere('post_id', post_id)
		.limit(1);
	return response[0] as SaveModel;
};

export const readUserSavesRepository = async (user_id: string) => {
	const response = await knexConnection('saves').select().where('user_id', user_id);
	return response as SaveModel[];
};

export const deleteSaveRepository = async (user_id: string, post_id: string) => {
	await knexConnection('saves').select().where('user_id', user_id).andWhere('post_id', post_id).del();
};
