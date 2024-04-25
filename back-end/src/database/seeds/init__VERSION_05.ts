import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('users').insert([
		{
			id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660770ac859e7e92b9f62a4c',
			username: 'user3',
			description: knex.raw('DEFAULT'),
			name: 'Captain Jack Sparrow',
			email: 'user3@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'https://wallpaperset.com/w/full/b/f/5/230343.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
		{
			id: '404fd3m6-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660ab059423e9ac1d78a2094',
			username: 'user4',
			description: knex.raw('DEFAULT'),
			name: 'Wonder Woman',
			email: 'user4@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'http://hdqwalls.com/wallpapers/wonder-woman-4k-2018-l9.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
		{
			id: '4k0fd056-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660ab06f6ea7bff45014fe3c',
			username: 'user5',
			description: knex.raw('DEFAULT'),
			name: 'Frodo Baggins',
			email: 'user5@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'https://i.pinimg.com/originals/5e/54/23/5e54232806b67c2f576b540b0e7f37da.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
		{
			id: '4k06d3m6-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660ab08d423e9ac1d78a20b4',
			username: 'user6',
			description: knex.raw('DEFAULT'),
			name: 'Hermione Granger',
			email: 'user6@gmail.com',
			role: knex.raw('DEFAULT'),
			picture:
				'https://images4.fanpop.com/image/photos/24400000/Hermione-Granger-Wallpaper-hermione-granger-24488212-1024-768.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
		{
			id: '4k0073m6-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660ab0a71d22f1c8a09279d5',
			username: 'user7',
			description: knex.raw('DEFAULT'),
			name: 'Darth Vader',
			email: 'user7@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'http://reggiestake.files.wordpress.com/2012/06/darth-vader-3.jpeg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
		{
			id: '4k0f08m6-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660ab0bd1d22f1c8a09279df',
			username: 'user8',
			description: knex.raw('DEFAULT'),
			name: 'Sherlock Holmes',
			email: 'user8@gmail.com',
			role: knex.raw('DEFAULT'),
			picture:
				'https://imgix.bustle.com/inverse/8d/2e/cc/37/6ca2/41c7/81cc/8c9a28f2dfbc/cumberbatch-holmesjpg.jpeg?w=1200&h=630&fit=crop&crop=faces&fm=jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
		{
			id: '4k0f09m6-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660ab0d16ea7bff45014fe71',
			username: 'user9',
			description: knex.raw('DEFAULT'),
			name: 'Katniss Everdeen',
			email: 'user9@gmail.com',
			role: knex.raw('DEFAULT'),
			picture:
				'http://images6.fanpop.com/image/photos/39000000/Katniss-Everdeen-the-hunger-games-39076855-2048-2048.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
		{
			id: '4k0f10m6-e93f-11ee-9af8-0242ac120002',
			auth0_id: 'auth0|660ab0e8423e9ac1d78a20f5',
			username: 'user10',
			description: knex.raw('DEFAULT'),
			name: 'Harry Potter',
			email: 'user10@gmail.com',
			role: knex.raw('DEFAULT'),
			picture: 'http://eskipaper.com/images/harry-potter-3.jpg',
			created_at: knex.raw('DEFAULT'),
			followers: knex.raw('DEFAULT'),
			following: 1,
		},
	]);

	await knex('posts').insert([
		{
			created_at: '2023-09-25 18:27:40',
			content: 'Just defeated another dark wizard! #AurorLife',
			like_count: 26,
			comment_count: 2,
			save_count: 1,
			user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-09-27 18:27:40',
			content: 'Out hunting in the woods. May the odds be ever in my favor!',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-09-28 18:27:40',
			content: 'Just solved a perplexing case. Elementary, my dear Watson!',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-09-29 18:27:40',
			content: 'Join me and together we can rule the galaxy!',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '4k0073m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-09-30 18:27:40',
			content: 'Studying at the library. Knowledge is power!',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '4k06d3m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-10-01 18:27:40',
			content: 'Embarking on a dangerous journey to destroy the One Ring. Wish me luck!',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-10-02 18:27:40',
			content: 'Protecting the world from injustice. Truth and justice prevail!',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '404fd3m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-10-03 18:27:40',
			content: 'Rum and adventures await! Savvy?',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002',
		},
	]);

	await knex('follows').insert([
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '404fd3m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '4k0fd056-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '4k06d3m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '4k0073m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002',
		},
		{
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
			follower_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002',
		},
	]);

	await knex('users').where('id', '2b2ac63c-e93f-11ee-9af8-0242ac120002').update({ followers: 11 });
}
