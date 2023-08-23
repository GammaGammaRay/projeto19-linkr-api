import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidation.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const commentariesRouter = Router();

export default commentariesRouter;