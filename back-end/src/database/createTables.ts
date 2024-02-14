import { connection } from "./createConnection";

const queries = [
  `CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL
  );`,
];

const execute = async (queries: string[]) => {
  try {
    await connection.connect(); // gets connection
    for (const query of queries) {
      await connection.query(query);
    }
    return true;
  } catch (error: any) {
    console.error(error.stack);
    return false;
  } finally {
    await connection.end(); // closes connection
  }
};

export const createTables = async () => {
  execute(queries).then((result) => {
    if (result) {
      console.log("Tables created");
    }
  });
};
