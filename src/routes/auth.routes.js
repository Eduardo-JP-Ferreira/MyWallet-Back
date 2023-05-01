import { Router } from "express";
import { getSignUp, postSignUp } from "../controllers/signUpController.js";
import { getSessions, postSignIn } from "../controllers/signInController.js";
import { signInObject, signUpObject } from "../schemas/auth.schemas.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";




const authRouter = Router()

authRouter.post("/sign-up", validadeSchema(signUpObject), postSignUp)

authRouter.get("/sign-up", getSignUp)

authRouter.post("/", validadeSchema(signInObject), postSignIn)


authRouter.get("/", getSessions)

export default authRouter