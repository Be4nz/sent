import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('users').insert([
		{
			id: '3sd3c63c-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|6605ca51423e9ac1d7883fda',
			username: 'user1',
			description: 'Hello everyone! I am a user.',
			name: 'Tom',
			email: 'user1@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'https://clipground.com/images/tom-cat-clipart.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: 0,
			following: 0,
		},
		{
			id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|6605ca7f6ea7bff450131a7b',
			username: 'user2',
			description:
				'This is a long description for user2. This is a long description for user2. This is a long description for user2. This is a long description for user2.',
			name: 'Jerry',
			email: 'user2@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'https://www.baltana.com/file/25727/700x394/16:9/jerry-best-wallpaper-26278_707238579.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: 0,
			following: 0,
		},
	]);

	await knex('follows').insert([
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
			follower_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
			follower_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002',
			follower_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002',
		},
	]);
}
