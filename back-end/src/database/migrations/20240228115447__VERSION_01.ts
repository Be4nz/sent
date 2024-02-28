import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('users', (table) => {
		table.string('description').defaultTo('');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('users', (table) => {
		table.dropColumn('description');
	});
}
