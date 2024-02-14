import { createPool, createConnection } from "mysql";

export const connection = createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: "sent",
  port: 3307,
});

export const pool = createPool({
  host: "localhost",
  user: "username",
  password: "password",
  database: "sent",
  port: 3307,
});
