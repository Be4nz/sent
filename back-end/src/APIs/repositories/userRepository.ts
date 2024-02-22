import { UUID } from "crypto";
import knexConnection from "../../database/knex";
import { User } from "../../models";

export const CREATEUSER = async (user: User) => {
    return await knexConnection("user").insert(user);
};

export const READUSER = async (id: UUID) => {
    return await knexConnection("user").where("id", id).select();
};

export const READUSERS = async () => {
    return await knexConnection("user").select();
};

export const UPDATEUSER = async (id: UUID, user: User) => {
    return await knexConnection("user").update(user).where("id", id);
};

export const DELETEUSER = async (id: UUID) => {
    return await knexConnection("user").del().where("id", id);
}