import { Router } from "express";
import usersRoute from "./usersRoute.js";
import individualPostsRoute from "./individualPostsRoute.js";
import generalPostsRoute from "./generalPostsRoute.js";



export const indexRoute = Router();
indexRoute.use(usersRoute);
indexRoute.use(generalPostsRoute);
indexRoute.use(individualPostsRoute);