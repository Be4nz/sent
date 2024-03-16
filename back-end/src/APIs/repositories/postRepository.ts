import knexConnection from "../../database/knex";
import { PostModel } from "../../models";

export const createPostRepository = async (post: PostModel) => {
  const response = await knexConnection("posts").insert(post);
  return response;
};

export const readPostRepository = async (id: string) => {
  const response = await knexConnection("posts").select().where("id", id);
  return response[0] as PostModel;
};
