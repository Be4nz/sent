import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('posts');

	await knex.schema.createTable('posts', (table) => {
		table.increments('id').primary();
		table.datetime('created_at').defaultTo(knex.fn.now());
		table.string('content', 255).notNullable();
		table.integer('like_count').unsigned().defaultTo(0);
		table.integer('comment_count').unsigned().defaultTo(0);
		table.integer('save_count').unsigned().defaultTo(0);
		table.string('user_id', 36).notNullable();

		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('posts');
}
