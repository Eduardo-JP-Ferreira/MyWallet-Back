import dayjs from 'dayjs'
import { db } from "../database/connection.js"


export async function postOperation(req, res){
    const {description, value, type} = req.body
    const {email} = res.locals.session
    try{
        const date = dayjs().format('DD/MM - HH:mm')
        const financeObject = {
            email: email,
            value: Number(value),
            type,
            description,
            date
        }
        await db.collection("finance").insertOne(financeObject);

        return res.sendStatus(201)
    }catch (err){
        console.log(err)
        res.status(500).send(err)
        }

}

export async function getOperation(req, res) {
    const users = await db.collection("finance").find().toArray()
        .then((users) => res.status(200).send(users))
        .catch((err) => res.status(500).send(err.message))
}


export async function postUser(req, res){
  
    const { email} = res.locals.session

    try {
        const operationObject = await db
            .collection("finance")
            .find({ email})
            .sort({ date: -1 })
            .toArray()

        res.send(operationObject)
    } catch (err) {
        res.status(500).send(err.message)
    }
}