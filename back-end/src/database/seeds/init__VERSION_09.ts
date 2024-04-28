import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("comments").insert([
        { user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'Hello, this is my comment!' },
		{ user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'First!' },
		{ user_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'Yo yo yo!' },
		{ user_id: '404fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'You are not that interesting!' },
		{ user_id: '4k0073m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'booooooooooo!' },
		{ user_id: '4k06d3m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'Be positive!' },
		{ user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'World domination!' },
		{ user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'eh' },
		{ user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'meh' },
		{ user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'heh' },
		{ user_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'xDDDDDD' },
		{ user_id: '4k0ffgr2-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'real' },
		{ user_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'ok.' },
        { user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'stop it!' },
		{ user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'gasdgasdgasdgbc' },
		{ user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'no' },
		{ user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'I have always wanted to be like you' },
		{ user_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'do not disturb my meditation' },
		{ user_id: '4k0ffgr2-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'rgagasgdal' },
		{ user_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'rawr' },

        { user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'Hello, this is my comment!' },
		{ user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'First!' },
		{ user_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'Yo yo yo!' },
		{ user_id: '404fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'You are not that interesting!' },
		{ user_id: '4k0073m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'booooooooooo!' },
		{ user_id: '4k06d3m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'Be positive!' },
		{ user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'World domination!' },
		{ user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'eh' },
		{ user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'meh' },
		{ user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'heh' },
		{ user_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'xDDDDDD' },
		{ user_id: '4k0ffgr2-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'real' },
		{ user_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'ok.' },
        { user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'stop it!' },
		{ user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'gasdgasdgasdgbc' },
		{ user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'no' },
		{ user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'I have always wanted to be like you' },
		{ user_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'do not disturb my meditation' },
		{ user_id: '4k0ffgr2-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'rgagasgdal' },
		{ user_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'rawr' },
        { user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: 'give up bruh' },
		{ user_id: '2b2ad3ed-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '1' },
		{ user_id: '3sd3c63c-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '2!' },
		{ user_id: '404fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '3' },
		{ user_id: '4k0073m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '4' },
		{ user_id: '4k06d3m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '5' },
		{ user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '6' },
		{ user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '7' },
		{ user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '8' },
		{ user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002', post_id: 11, created_at: knex.raw('DEFAULT'), content: '9' },
        
        { user_id: '4k06d3m6-e93f-11ee-9af8-0242ac120002', post_id: 2, created_at: knex.raw('DEFAULT'), content: 'Be positive!' },
		{ user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002', post_id: 2, created_at: knex.raw('DEFAULT'), content: 'World domination!' },
		{ user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002', post_id: 2, created_at: knex.raw('DEFAULT'), content: 'eh' },
		{ user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002', post_id: 2, created_at: knex.raw('DEFAULT'), content: 'meh' },
		{ user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002', post_id: 2, created_at: knex.raw('DEFAULT'), content: 'heh' },
		{ user_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 3, created_at: knex.raw('DEFAULT'), content: 'xDDDDDD' },
		{ user_id: '4k0ffgr2-e93f-11ee-9af8-0242ac120002', post_id: 3, created_at: knex.raw('DEFAULT'), content: 'real' },
		{ user_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002', post_id: 3, created_at: knex.raw('DEFAULT'), content: 'ok.' },
        { user_id: '4k0f08m6-e93f-11ee-9af8-0242ac120002', post_id: 3, created_at: knex.raw('DEFAULT'), content: 'stop it!' },
		{ user_id: '4k0f09m6-e93f-11ee-9af8-0242ac120002', post_id: 4, created_at: knex.raw('DEFAULT'), content: 'gasdgasdgasdgbc' },
		{ user_id: '4k0f10m6-e93f-11ee-9af8-0242ac120002', post_id: 4, created_at: knex.raw('DEFAULT'), content: 'no' },
		{ user_id: '4k0fd056-e93f-11ee-9af8-0242ac120002', post_id: 5, created_at: knex.raw('DEFAULT'), content: 'I have always wanted to be like you' },
		{ user_id: '4k0fd3m6-e93f-11ee-9af8-0242ac120002', post_id: 5, created_at: knex.raw('DEFAULT'), content: 'do not disturb my meditation' },
		{ user_id: '4k0ffgr2-e93f-11ee-9af8-0242ac120002', post_id: 6, created_at: knex.raw('DEFAULT'), content: 'rgagasgdal' },
		{ user_id: 'l99fd3ed-e93f-11ee-9af8-0242ac120002', post_id: 7, created_at: knex.raw('DEFAULT'), content: 'rawr' },
    ]);
};