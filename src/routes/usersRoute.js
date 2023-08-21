import { Router } from "express";
import { searchUsers, getUserPosts } from "../controllers/usersControllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const usersRoute = Router();

usersRoute.get("/users/search/:string", tokenValidation, searchUsers);
usersRoute.get("/users/:id/posts", tokenValidation, getUserPosts);

export default usersRoute;