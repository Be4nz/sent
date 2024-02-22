import { Request, Response } from "express";
import { User } from "../../models";
import { createUserRepository, deleteUserRepository, readUserRepository, readUserAuth0Repository, readUsersRepository, updateUserRepository } from "../repositories";

export const createUser = async (req: Request, res: Response) => {
    const user = req.body as User;
    try {
        let response = await readUserAuth0Repository(user.auth0_id);
        if (response) {
            res.status(409).send("User already exists");
            return;
        }
        
        await createUserRepository(user);
        response = await readUserAuth0Repository(user.auth0_id);
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const readUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const response = await readUserRepository(id);
        if (!response) {
            res.status(404).send("User not found");
            return;
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const readUsers = async (req: Request, res: Response) => {
    try {
        const response = await readUsersRepository();
        if (!response) {
            res.status(200).send("No users found");
            return;
        }
            
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.body as User;
    const authPayload = req.auth?.payload;
    try {
        let response = await readUserRepository(id);
        if (!response) {
            res.status(404).send("User not found");
            return
        }
        
        // Check if the user is trying to update their own id, auth0_id, role or created_at and forbid it.
        // Role is updatable in the auth0 dashboard. Then it enables api to also update when using updateUser.
        // Id, auth0_id and created_at is not updatable.    

        if (user.id && response.id !== user.id) {
            res.status(403).send("User ID mismatch: Forbidden");
            return;
        }
        
        if (user.auth0_id && response.auth0_id !== user.auth0_id) {
            res.status(403).send("Auth0 ID mismatch: Forbidden");
            return;
        }
        
        if (authPayload && authPayload.role === response.role) {
            if (user.role && response.role !== user.role) {
                res.status(403).send("Role mismatch: Forbidden");
                return;
            }
        }
        
        if (user.created_at && response.created_at !== user.created_at) {
            res.status(403).send("Creation date mismatch: Forbidden");
            return;
        }

        await updateUserRepository(id, user);
        response = await readUserRepository(id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const response = await readUserRepository(id);
        if (!response) {
            res.status(404).send("User not found");
            return
        }

        await deleteUserRepository(id);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};