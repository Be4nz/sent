import knexConnection from "../../database/knex";
import { User } from "../../models";

export const createUserRepository = async (user: User) => {
    const response = await knexConnection("users")
    .insert(user);
    return response;
};

export const readUserAuth0Repository = async (auth0_id: string) => {
    const response = await knexConnection("users")
    .select()
    .where("auth0_id", auth0_id);
    return response[0] as User;
};

export const readUserRepository = async (id: string) => {
    const response = await knexConnection("users")
    .select()
    .where("id", id);
    return response[0] as User;
};

export const readUsersRepository = async () => {
    const response = await knexConnection("users")
    .select();
    return response as User[];
};

export const updateUserRepository = async (id: string, user: User) => {
    await knexConnection("users")
    .update(user)
    .where("id", id);
};

export const deleteUserRepository = async (id: string) => {
    await knexConnection("users")
    .where("id", id)
    .del();
}