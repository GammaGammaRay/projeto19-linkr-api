import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidation.js';
import { postSchema } from '../schemas/posts.schema.js';
import { getPosts, createPosts, postRepost, getRepost } from '../controllers/posts.controllers.js';
import { deletePost, handleLIke, editPost } from '../controllers/individualPostControllers.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const postsRouter = Router();

postsRouter.post('/posts', schemaValidation(postSchema), tokenValidation, createPosts);
postsRouter.get('/posts', tokenValidation, getPosts);
postsRouter.put('/posts/:id', tokenValidation, editPost);
postsRouter.delete('/posts/:id', tokenValidation, deletePost);
postsRouter.post('/posts/:id/repost', postRepost);
postsRouter.get('/posts/repost', getRepost);
postsRouter.post('/handleLike',tokenValidation, handleLIke);

export default postsRouter;