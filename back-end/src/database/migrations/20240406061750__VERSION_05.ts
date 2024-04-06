import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('comments');

	await knex.schema.createTable('comments', (table) => {
		table.increments('id').primary();
		table.datetime('created_at').defaultTo(knex.fn.now());
		table.string('content', 255).notNullable();
		table.integer('post_id').unsigned().notNullable();
		table.string('user_id', 36).notNullable();

		table.foreign('post_id').references('id').inTable('posts').onDelete('cascade');
		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('comments');
}
