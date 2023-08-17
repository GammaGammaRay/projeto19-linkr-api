import { Router } from "express";
import { 
        deletePost,
        editPost,
        handleLIke 
} from "../controllers/individualPostControllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const individualPostsRoute = Router();

individualPostsRoute.post('/handleLike',tokenValidation ,handleLIke);
individualPostsRoute.delete('/deletePost',tokenValidation ,deletePost);
individualPostsRoute.post('/editPost',tokenValidation ,editPost);

export default individualPostsRoute;