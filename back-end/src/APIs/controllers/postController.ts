import { Request, Response } from "express";
import { PostModel } from "../../models";
import {
  createPostRepository,
  readPostRepository,
} from "../repositories/postRepository";

export const createPost = async (req: Request, res: Response) => {
  const post = req.body as PostModel;
  try {
    post.created_at = new Date();

    await createPostRepository(post);

    res.status(201).json("Post created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const readPost = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const response = await readPostRepository(id);
    if (!response) {
      res.status(404).send("Post not found");
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
