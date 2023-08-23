import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidation.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';
import { getCommentaries, postCommentary } from '../controllers/commentaries.controllers.js';
import { commentarySchema } from '../schemas/commentarySchema.js';

const commentariesRouter = Router();

commentariesRouter.get("/commentaries/:postid", tokenValidation, getCommentaries)
commentariesRouter.post("/commentaries", tokenValidation, schemaValidation(commentarySchema), postCommentary)

export default commentariesRouter;