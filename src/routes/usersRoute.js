import { Router } from "express";
import { searchUsers, getUserPosts, followUser, getFollowing, unfollowUser } from "../controllers/usersControllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const usersRoute = Router();

usersRoute.get("/users/search/:string", tokenValidation, searchUsers);
usersRoute.get("/users/:id/posts", tokenValidation, getUserPosts);
usersRoute.post("/users/:id/follow", tokenValidation, followUser);
usersRoute.get("/users/following", tokenValidation, getFollowing);
usersRoute.delete("/users/:id/unfollow", tokenValidation, unfollowUser);

export default usersRoute;