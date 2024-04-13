import { Router } from 'express';
import { checkOwnership } from '../middlewares/authentication';
import { createSave, deleteSave, readSave, readSavedBy, readUserSaves } from '../APIs/controllers';

export const saveRouter = Router();

saveRouter.post('/', checkOwnership('saves'), createSave);

saveRouter.get('/', checkOwnership('saves'), readSave);

saveRouter.get('/savedBy', readSavedBy);

saveRouter.get('/userSaves', readUserSaves);

saveRouter.delete('/', checkOwnership('saves'), deleteSave);
