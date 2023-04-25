import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import joi from "joi"
import bcrypt from 'bcrypt';
import { getSignUp, postSignUp } from "./controllers/signUpController.js"
import { getSessions, postSignIn } from "./controllers/signInController.js"
import { getOperation, postOperation } from "./controllers/operationsController.js"

// Criação do servidor
const app = express()

// Configurações
app.use(express.json())
app.use(cors())
dotenv.config()

// Conexão com o Banco de Dados
export let db
const mongoClient = new MongoClient(process.env.DATABASE_URL)
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message))

// Endpoints
app.post("/sign-up", postSignUp)

app.get("/sign-up", getSignUp)

app.post("/", postSignIn)

app.get("/", getSessions)

app.post("/ope", postOperation)

app.get("/ope", getOperation)

// Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na portaa ${PORT}`))
