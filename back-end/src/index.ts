import express from "express";
import cors from "cors";
import { createTables } from "./database/createTables";
import router from "./APIs/posts/routes";
import { errorHandler, requestLogger, verifyJwt } from "./middlewares";

const app = express();

createTables();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(verifyJwt);

app.use("", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
