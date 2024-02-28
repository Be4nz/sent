import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("users")
        .where("username", "admin")
        .update({description: "This is a system admin!"});
};
