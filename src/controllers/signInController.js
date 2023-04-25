import { db } from "../app.js"
import joi from "joi"
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function postSignIn(req, res){
    const {email, password} = req.body
    const signUpObject = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(3).required()
      })
    const validate = signUpObject.validate(req.body, { abortEarly: false })
    if (validate.error) {
        const errors = validate.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
      }

    const verifyEmail= await db.collection("users").findOne({ email: email })
    if(verifyEmail){
        console.log(verifyEmail)

        if(bcrypt.compareSync(password, verifyEmail.encryptedPassword)){            
            
            try{                
                const token = uuid();
                await db.collection("sessions").insertOne({userId: verifyEmail._id,token,email: verifyEmail.email})
                
                const objetoLogin ={
                    token,
                    name: verifyEmail.name,                    
                }

                return res.status(200).send(objetoLogin);
            }catch (err){
                console.log(err)
                res.status(500).send(err)
            }
        }
        else{
            res.sendStatus(401)
        }

    }else{
        res.sendStatus(404)
    }
}

export async function getSessions(req, res) {
    const users = await db.collection("sessions").find().toArray()
        .then((users) => res.status(200).send(users))
        .catch((err) => res.status(500).send(err.message))
}