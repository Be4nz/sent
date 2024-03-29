import { Router } from 'express';
import { checkOwnership } from '../middlewares/authentication';
import { createFollow, deleteFollow, readFollow } from '../APIs/controllers';

export const followRouter = Router();

followRouter.post('/', checkOwnership('follows'), createFollow);

followRouter.get('/', readFollow);

followRouter.delete('/', checkOwnership('follows'), deleteFollow);
