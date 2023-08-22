import { Router } from 'express';
import { getPosts,createPosts } from '../controllers/posts.controllers.js';
import { schemaValidation } from '../middlewares/schemaValidation.js';
import { postSchema } from '../schemas/posts.schema.js';
import { deletePost, handleLIke } from '../controllers/individualPostControllers.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const postsRouter = Router();

postsRouter.post('/posts', schemaValidation(postSchema), tokenValidation, createPosts);
postsRouter.get('/posts', tokenValidation, getPosts);
postsRouter.post('/handleLike', tokenValidation ,handleLIke);
postsRouter.delete('/deletePost',tokenValidation ,deletePost);

export default postsRouter;