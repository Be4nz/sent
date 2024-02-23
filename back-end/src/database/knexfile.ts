import type { Knex } from "knex";
require("dotenv").config(); // Not working...

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3307,
      database: process.env.DB_DATABASE || "sent",
      user: process.env.DB_USER || "username",
      password: process.env.DB_PASSWORD || "password"
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
