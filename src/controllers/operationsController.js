import dayjs from 'dayjs'
import { db } from "../database/connection.js"


export async function postOperation(req, res){
    const {description, value, type} = req.body
    const {email} = res.locals.session
    try{
        const date = dayjs().format('DD/MM')
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
    // O cliente deve enviar um header de authorization com o token
    const { authorization } = req.headers

    // O formato é assim: Bearer TOKEN, então para pegar o token vamos tirar a palavra Bearer
    const token = authorization?.replace("Bearer ", "")

    // Se não houver token, não há autorização para continuar
    if (!token) return res.status(401).send("Token inexistente")

    try {
        // Caso o token exista, precisamos descobrir se ele é válido
        // Ou seja: se ele está na nossa collection de sessoes
        const sessao = await db.collection("sessions").findOne({ token: token })
        if (!sessao) return res.status(401).send("Token inválido")

        // Caso a sessão tenha sido encontrada, irá guardar a variavel sessão duas coisas:
        // O token e o id do usuário. Tendo o id do usuário, podemos procurar seus dados
        const usuario = await db.collection("users").findOne({email: sessao.email})

        // O usuario possui _id, nome, email e senha. Mas não podemos enviar a senha!
        // delete usuario.senha

        // Agora basta enviar a resposta ao cliente
        res.send(usuario)

    } catch (err) {
        res.status(500).send(err.message)
    }
}