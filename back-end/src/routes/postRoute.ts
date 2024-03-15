import { Router } from "express";
import { createPost, readPost } from "../APIs/controllers/postController";

export const postRouter = Router();

postRouter.post("/", createPost);

postRouter.get("/:id", readPost);
