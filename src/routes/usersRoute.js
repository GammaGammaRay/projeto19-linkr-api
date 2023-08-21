import { Router } from "express";
import { searchUsers } from "../controllers/usersControllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const usersRoute = Router();

usersRoute.get("/users/search/:string", searchUsers);

export default usersRoute;