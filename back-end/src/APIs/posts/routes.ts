import { Router } from "express";
import controller from "./controller";

const router = Router();

router.post("/posts", controller.addPost);
router.get("/posts", controller.getAllPosts);
router.get("/posts/:id", controller.getPostById);

export default router;
