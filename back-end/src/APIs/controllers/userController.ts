import { Request, Response } from "express";
import { User } from "../../models";
import { CREATEUSER, DELETEUSER, READUSER, READUSERS, UPDATEUSER } from "../repositories/userRepository";
import { UUID } from "crypto";

export const createUser = async (req: Request, res: Response) => {
    const user = req.body as User;
    
    try {
        await CREATEUSER(user);
        res.status(201).send("User created");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const readUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: UUID };

    try {
        const user = READUSER(id);
        if (user)
            res.status(200).json(user);
        else
            res.status(404).send("User not found");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const readUsers = async (req: Request, res: Response) => {
    try {
        const users = await READUSERS();
        if (users)
            res.status(200).json(users);
        else
            res.status(200).send("No users found");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: UUID };
    const user = req.body as User;

    try {
        await UPDATEUSER(id, user);
        res.status(200).send("User updated").json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params as { id: UUID };

    try {
        await DELETEUSER(id);
        res.status(200).send("User deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};