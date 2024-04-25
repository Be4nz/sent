import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("comments").insert([
        { user_id: '2b2ac63c-e93f-11ee-9af8-0242ac120002', post_id: 1, created_at: knex.raw('DEFAULT'), content: 'Hello, this is my comment!' },
    ]);
};
