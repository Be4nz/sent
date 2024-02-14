import { Request, Response } from "express";
import { pool } from "../../database/createConnection";
import queries from "./queries";

const getAllPosts = (req: Request, res: Response) => {
  pool.query(queries.getAllPosts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const addPost = (req: Request, res: Response) => {
  const { text } = req.body;

  pool.query(queries.addPost, [text], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).send("Post created");
  });
};

const getPostById = (req: Request, res: Response) => {
  const id = req.params.id;

  pool.query(queries.getPostById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export default { getAllPosts, addPost, getPostById };
