import joi from "joi"

export const OperationObject = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().required(),
    type: joi.string().required().valid("deposit", "withdraw")
  })