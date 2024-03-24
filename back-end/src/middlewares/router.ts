import { Router } from 'express';
import { userRouter } from '../routes';
import { postRouter } from '../routes/postRoute';

export const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
