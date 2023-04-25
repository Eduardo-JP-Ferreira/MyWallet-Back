import { db } from "../app.js"
import joi from "joi"
import dayjs from 'dayjs'

export async function postOperation(req, res){
    const {token, value, type} = req.body
    const signUpObject = joi.object({
        token: joi.string().required(),
        value: joi.number().positive().required(),
        type: joi.string().required()
      })
    const validate = signUpObject.validate(req.body, { abortEarly: false })
    if (validate.error) {
        const errors = validate.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
      }

    const verifyToken= await db.collection("sessions").findOne({ token: token })
    if(verifyToken){
       
        try{
            const date = dayjs().format('DD/MM')
            const financeObject = {
                email: verifyToken.email,
                value: parseFloat(value).toFixed(2),
                type,
                date
            }
            await db.collection("finance").insertOne(financeObject);

            return res.sendStatus(201)
        }catch (err){
            console.log(err)
            res.status(500).send(err)
          }
    }else{
        res.sendStatus(401)
    }
}

export async function getOperation(req, res) {
    const users = await db.collection("finance").find().toArray()
        .then((users) => res.status(200).send(users))
        .catch((err) => res.status(500).send(err.message))
}