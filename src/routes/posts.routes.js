import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidation.js';
import { postSchema } from '../schemas/posts.schema.js';
import { getPosts,createPosts } from '../controllers/posts.controllers.js';
import { deletePost, handleLIke, editPost } from '../controllers/individualPostControllers.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const postsRouter = Router();

postsRouter.post('/posts', schemaValidation(postSchema), createPosts);
postsRouter.get('/posts', getPosts);
postsRouter.put('/posts/:id', editPost);
postsRouter.delete('/posts/:id', deletePost);
postsRouter.post('/handleLike',tokenValidation, handleLIke);

export default postsRouter;