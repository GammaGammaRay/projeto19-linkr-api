import { Router } from "express";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { getPostsByTag, getTrendingTags, postNewTag } from "../controllers/hashtagsControllers.js";

const hashtagRouter = Router();

hashtagRouter.post('hashtag/:tagName', tokenValidation, postNewTag)
hashtagRouter.get('/trending', tokenValidation, getTrendingTags);
hashtagRouter.get('/hashtag/:tagNameg', tokenValidation, getPostsByTag);

export default hashtagRouter;