import { Router } from "express";
import { deletePost, handleLIke } from "../controllers/individualPostControllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const individualPostsRoute = Router();

individualPostsRoute.post('/handleLike',tokenValidation ,handleLIke);
individualPostsRoute.delete('/deletePost',tokenValidation ,deletePost);

export default individualPostsRoute;