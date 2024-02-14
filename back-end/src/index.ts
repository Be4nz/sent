import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { createTables } from "./database/createTables";
import router from "./APIs/posts/routes";

const app = express();

createTables();

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
