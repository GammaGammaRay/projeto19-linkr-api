import { Router } from "express";
import usersRoute from "./usersRoute.js";
import AuthRouter from "./auth.routes.js";
import hashtagRouter from "./hashtags.routes.js";
import postsRouter from "./posts.routes.js";
import commentariesRouter from "./commentaries.routes.js";

const indexRoute = Router();

indexRoute.use(AuthRouter);
indexRoute.use(postsRouter);
indexRoute.use(usersRoute);
indexRoute.use(hashtagRouter);
indexRoute.use(commentariesRouter);

export { indexRoute };
