import { Router } from "express";
import authRouter from "./auth.routes.js";
import operationRouter from "./operation.routes.js";

const router = Router()
router.use(authRouter)
router.use(operationRouter)

export default router