
import { db } from "../database/connection.js"
import bcrypt from 'bcrypt';


export async function getSignUp(req, res) {
    const users = await db.collection("users").find().toArray()
        .then((users) => res.status(200).send(users))
        .catch((err) => res.status(500).send(err.message))
}

export async function postSignUp(req, res){
    const {name, email, password} = req.body

    const verifyEmail= await db.collection("users").findOne({ email: email })
    if(!verifyEmail){
        const encryptedPassword = bcrypt.hashSync(password, 10);
        try{
            const arraySignUp = {
                name,
                email,
                encryptedPassword
            }
            await db.collection("users").insertOne(arraySignUp);

            return res.sendStatus(201)
        }catch (err){
            console.log(err)
            res.status(500).send(err)
          }
    }else{
        res.sendStatus(409)
    }
}