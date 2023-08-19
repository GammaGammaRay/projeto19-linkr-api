import { Router } from "express";
import usersRoute from "./usersRoute.js";
import individualPostsRoute from "./individualPostsRoute.js";
import generalPostsRoute from "./generalPostsRoute.js";
import AuthRouter from "./auth.routes.js";
import hashtagRouter from "./hashtags.routes.js";

const indexRoute = Router();

indexRoute.use(AuthRouter);
indexRoute.use(usersRoute);
indexRoute.use(generalPostsRoute);
indexRoute.use(individualPostsRoute);
indexRoute.use(hashtagRouter);

export { indexRoute };
