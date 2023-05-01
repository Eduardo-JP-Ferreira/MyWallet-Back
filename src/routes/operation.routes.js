import { Router } from "express";
import { getOperation, postOperation, postUser } from "../controllers/operationsController.js";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { OperationObject } from "../schemas/operation.schema.js";
import { authToken } from "../middlewares/authToken.middleware.js";

const operationRouter = Router()

operationRouter.use(authToken)

operationRouter.post("/ope",validadeSchema(OperationObject), postOperation)

operationRouter.get("/ope", getOperation)

operationRouter.get("/home", postUser)

export default operationRouter