import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { getPostsByTag, getTrendingTags } from "../controllers/hashtagsControllers.js";

const hashtagRouter = Router();

hashtagRouter.get('/trending', tokenValidation, getTrendingTags);
hashtagRouter.post('hashtag/:tagName')
hashtagRouter.get('/hashtag/:tagName', tokenValidation, getPostsByTag);

export default hashtagRouter;