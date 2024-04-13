import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('saves');

	await knex.schema.createTable('saves', (table) => {
		table.string('user_id', 36).notNullable();
		table.integer('post_id').unsigned().notNullable();

		table.primary(['user_id', 'post_id']);

		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
		table.foreign('post_id').references('id').inTable('posts').onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('saves');
}
