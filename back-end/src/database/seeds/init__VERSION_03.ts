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
			picture:
				'https://purepng.com/public/uploads/large/purepng.com-jerry-tom-and-jerrytom-and-jerrytomjerryanimated-seriesin-1940characters-17015286595464y8nc.png',
			created_at: knex.raw('DEFAULT'),
			followers: 0,
			following: 0,
		},
	]);

	await knex('posts').insert([
		{
			created_at: '2024-03-24 18:27:40',
			content: "I'm Tom and I'm new to this platform!",
			like_count: 26,
			comment_count: 2,
			save_count: 1,
			user_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2024-03-25 18:27:40',
			content: "Today I couldn't catch Jerry again!",
			like_count: 3,
			comment_count: 1,
			save_count: 0,
			user_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2024-03-25 21:27:40',
			content: 'Once more I fooled Tom!',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2024-03-28 21:27:40',
			content: 'Unopropiated bahavior is not allowed! Please be respectful! #respect #love #peace',
			like_count: 13,
			comment_count: 13,
			save_count: 13,
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
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
