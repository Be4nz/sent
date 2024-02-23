import { Router } from "express";
import { createUser, deleteUser, readUser, readUsers, updateUser } from "../APIs/controllers";
import { checkAdminOrOwn, checkRole } from ".";

export const router = Router();

// User routes
router.post('/users', checkAdminOrOwn(), createUser);
router.get('/users/:id',checkAdminOrOwn(), readUser);
router.get('/users', checkRole("admin"), readUsers);
router.put('/users/:id', checkAdminOrOwn(), updateUser);
router.delete('/users/:id', checkAdminOrOwn(), deleteUser);