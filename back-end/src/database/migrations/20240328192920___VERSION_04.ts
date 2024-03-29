import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('follows');

	await knex.schema.createTable('follows', (table) => {
		table.string('user_id', 36).notNullable();
		table.string('follower_id', 36).notNullable();

		table.primary(['user_id', 'follower_id']);

		table.foreign('user_id').references('id').inTable('users').onDelete('cascade');
		table.foreign('follower_id').references('id').inTable('users').onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('follows');
}
