import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('comment_likes');

	await knex.schema.createTable('comment_likes', (table) => {
		table.integer('comment_id').unsigned().notNullable();
		table.string('user_id', 36).notNullable();

		table.primary(['comment_id', 'user_id']);

		table.foreign('comment_id').references('id').inTable('comments').onDelete('cascade');
		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('comment_likes');
}
