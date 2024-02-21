import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("user").truncate();
    await knex("user").insert([
        { 
            id: knex.raw("DEFAULT"),
            auth0_id: "auth0|65d2833c7728d88f53ac1b41",
            username: "admin",
            name: "admin@gmail.com",
            email: "admin@gmail.com",
            role: "admin",
            picture: knex.raw("DEFAULT"),
            created_at: knex.raw("DEFAULT"),
            followers: 999,
            following: 999
        },
        { 
            id: knex.raw("DEFAULT"),
            auth0_id: "auth0|auth0|65cf987f3d77dce50c006f4c",
            username: "user",
            name: "user@gmail.com",
            email: "user@gmail.com",
            role: knex.raw("DEFAULT"), 
            picture: knex.raw("DEFAULT"),
            created_at: knex.raw("DEFAULT"),
            followers: knex.raw("DEFAULT"),
            following: knex.raw("DEFAULT")
        }
    ]);
}
