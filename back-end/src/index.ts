import express from "express";
import cors from "cors";
import { errorHandler, requestLogger, verifyJwt, router } from "./middlewares";
import { swaggerDocs } from "./configs";
import { postRouter } from "./routes/postRoute";

const swaggerUI = require("swagger-ui-express");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", requestLogger);
//app.use("/api/v1", verifyJwt);

app.use("/api/v1", router);
app.use("/api-docs/v1", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
