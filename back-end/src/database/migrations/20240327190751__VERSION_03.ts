import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('likes');

	await knex.schema.createTable('likes', (table) => {
		table.integer('post_id').unsigned().notNullable();
		table.string('user_id', 36).notNullable();

		table.primary(['post_id', 'user_id']);

		table.foreign('post_id').references('id').inTable('posts').onDelete('cascade');
		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
	});
}
