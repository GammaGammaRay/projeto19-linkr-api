import { Router } from 'express';
import { getPosts,createPosts } from '../controllers/posts.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.js';
import { postSchema } from '../schemas/posts.schema.js';

const postsRouter = Router();

postsRouter.post('/posts', schemaValidation(postSchema), createPosts);
postsRouter.get('/posts', getPosts);

export default postsRouter;