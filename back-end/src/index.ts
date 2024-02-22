import express from "express";
import cors from "cors";
import { errorHandler, requestLogger, verifyJwt, router } from "./middlewares";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(verifyJwt);

app.use("/api/v1", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
