import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('users');

	await knex.schema.createTable('users', (table) => {
		table.string('id', 36).primary().defaultTo(knex.raw('(UUID())'));
		table.string('auth0_id', 255).notNullable().unique();
		table.string('username', 20).notNullable().unique();
		table.string('name', 20).notNullable();
		table.string('description', 255).defaultTo('');
		table.string('email', 255).notNullable().unique();
		table.string('role', 16).defaultTo('user');
		table
			.string('picture', 255)
			.defaultTo(
				'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsbcf.fr%2Fwp-content%2Fuploads%2F2018%2F03%2Fsbcf-default-avatar.png&f=1&nofb=1&ipt=041c528388efe43c20b3872742aa897b5a0111dae54f8b7368835f7aa066dfd8&ipo=images'
			);
		table.datetime('created_at').defaultTo(knex.fn.now());
		table.integer('followers').defaultTo(0);
		table.integer('following').defaultTo(0);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('users');
}
