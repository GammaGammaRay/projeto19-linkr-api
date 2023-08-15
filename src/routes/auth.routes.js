import { Router } from "express";
import signin from "../controllers/signin";
import signup from "../controllers/signup";

const AuthRouter = Router();

AuthRouter.get('/login', signin);
AuthRouter.get('/register', signup);


export default AuthRouter;