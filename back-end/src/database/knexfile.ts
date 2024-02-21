import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      host: "localhost",
      port: 3307,
      database: "sent",
      user: "username",
      password: "password"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    debug: true,
    useNullAsDefault: true
  }
};

module.exports = config;
