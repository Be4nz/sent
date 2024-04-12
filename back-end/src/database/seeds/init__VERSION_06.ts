import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('users').insert([
		{
			id: '4k0ffgr2-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|6614659d11464295031f4766',
			username: 'tester',
			description: 'This tester is known in database',
			name: 'Valid Tester',
			email: 'tester@gmail.com',
			role: knex.raw('DEFAULT'),
			picture:
				'https://png.pngtree.com/png-vector/20190629/ourlarge/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: knex.raw('DEFAULT'),
		},
	]);
}
