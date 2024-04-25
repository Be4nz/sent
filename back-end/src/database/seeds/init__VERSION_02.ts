import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
	await knex('posts').insert([
		{
			created_at: '2023-08-12 18:27:40',
			content: 'This is the first "sent" post! I hope everyone enojys our application! Feel free to give feedback',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2024-01-23 18:27:40',
			content:
				'My husband (42m) and I (41f) tried to have children for 13 years before we accepted that we were never going to have it happen for us. We spent a lot of time hoping and trying different things and nothing worked.',
			like_count: 0,
			comment_count: 0,
			save_count: 5,
			user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2024-02-23 18:27:40',
			content:
				"I'm feeling extremely frustrated with my Pixel 8 Pro. Even during my vacation in Dubai, I find myself constantly reliant on a power bank",
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2024-01-12 18:27:40',
			content:
				'As you traverse the landscapes of life, scatter seeds of hope along your path. For in nurturing the dreams of others, you cultivate a garden of possibility, where the flowers of tomorrow bloom in abundance.',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-12-23 18:27:40',
			content:
				'Believe in the boundless potential that resides within you, a spark waiting to ignite the flames of possibility. With unwavering faith, embrace the journey ahead, knowing that you are capable of achieving greatness.',
			like_count: 0,
			comment_count: 0,
			save_count: 5,
			user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2023-12-18 18:27:40',
			content:
				'In a cacophony of voices, be the melody that resonates with hearts. Extend kindness like a symphony, weaving threads of compassion through the fabric of humanity.',
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002',
		},
		{
			created_at: '2024-03-23 18:27:40',
			content:
				"We're making great progress on the new project! The team is working hard and we're excited to see the final product. Stay tuned for updates!",
			like_count: 0,
			comment_count: 0,
			save_count: 0,
			user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002',
		},
	]);
}
