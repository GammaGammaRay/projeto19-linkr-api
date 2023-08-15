import { Router } from "express";
import AuthRouter from "./auth.routes.js";

const indexRoute = Router();

indexRoute.use(AuthRouter);

export { indexRoute }