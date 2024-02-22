import { Router } from "express";
import { createUser, deleteUser, readUser, readUsers, updateUser } from "../APIs/controllers";

export const router = Router();

// User routes
router.post('/users', createUser);
router.get('/users/:id', readUser);
router.get('/users', readUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);