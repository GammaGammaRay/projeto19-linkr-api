import { Router } from "express";
import signin from "../controllers/signin.js";
import signup from "../controllers/signup.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";

const AuthRouter = Router();

AuthRouter.post('/signin', schemaValidation(signinSchema), signin);
AuthRouter.post('/signup', schemaValidation(signupSchema), signup);

export default AuthRouter;