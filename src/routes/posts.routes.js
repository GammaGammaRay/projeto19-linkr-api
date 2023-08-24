import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidation.js';
import { postSchema } from '../schemas/posts.schema.js';
import { getPosts, createPosts, postRepost, getRepost, newPosts } from '../controllers/posts.controllers.js';
import { deletePost, handleLIke, editPost } from '../controllers/individualPostControllers.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const postsRouter = Router();

postsRouter.post('/posts', schemaValidation(postSchema), tokenValidation, createPosts);
postsRouter.post('/posts/:id/repost', postRepost);
postsRouter.post('/handleLike',tokenValidation, handleLIke);
postsRouter.get('/posts', tokenValidation, getPosts);
postsRouter.get('/posts/repost', getRepost);
postsRouter.get('/posts/new-posts', newPosts);
postsRouter.put('/posts/:id', tokenValidation, editPost);
postsRouter.delete('/posts/:id', tokenValidation, deletePost);

export default postsRouter;