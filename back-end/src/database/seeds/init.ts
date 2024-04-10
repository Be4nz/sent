import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('comments').del();
	await knex.raw(`ALTER TABLE comments AUTO_INCREMENT = 1`);

	await knex('follows').del();

	await knex('posts').del();
	await knex.raw(`ALTER TABLE posts AUTO_INCREMENT = 1`);

	await knex('users').del();
}
