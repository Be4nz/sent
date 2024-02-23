import { Router } from "express";
import { userRouter } from "../routes";

export const router = Router();

router.use("/users", userRouter);