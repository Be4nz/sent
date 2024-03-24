import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('users').insert([
		{
			id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|65d2833c7728d88f53ac1b41',
			username: 'admin',
			description: 'This is a system admin!',
			name: 'John',
			email: 'admin@gmail.com',
			role: 'admin',
			picture: 'https://i1.wp.com/www.bulletproofaction.com/wp-content/uploads/2015/09/john-wick.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: 999,
			following: 999,
		},
		{
			id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|65cf987f3d77dce50c006f4c',
			username: 'user',
			description: knex.raw('DEFAULT'),
			name: 'Ben',
			email: 'user@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'https://i.pinimg.com/originals/20/7c/c5/207cc534790d3048c340d12cce52d4a2.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: knex.raw('DEFAULT'),
		},
	]);
}
