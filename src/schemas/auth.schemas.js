import joi from "joi";

export const signInObject = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
  })

export  const signUpObject = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
  })
