import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('users').where('id', '2b2ac63c-e93f-11ee-9af8-0242ac120002').update({ followers: 3, following: 0 });
	await knex('users').where('id', '2b2ad3ed-e93f-11ee-9af8-0242ac120002').update({ followers: 2, following: 1 });
	await knex('users').where('id', '3sd3c63c-e93f-11ee-9af8-0242ac120002').update({ followers: 1, following: 2 });
	await knex('users').where('id', 'l99fd3ed-e93f-11ee-9af8-0242ac120002').update({ followers: 0, following: 3 });
}
