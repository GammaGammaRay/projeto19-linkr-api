import { Router } from "express";
import { handleLIke } from "../controllers/individualPostControllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const individualPostsRoute = Router();

individualPostsRoute.use('/like/:postId',tokenValidation ,handleLIke);

export default individualPostsRoute;