import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("posts");

  await knex.schema.createTable("posts", (table) => {
    table.string("id").primary().defaultTo(knex.raw("(UUID())"));
    table.date("created_at");
    table.string("content").notNullable();
    table.string("user_id").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("posts");
}
