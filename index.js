
import * as dotenv from 'dotenv';
import express from 'express';
import MotoristaRegisterRoute from './routes/MotoristaRegisterRoute.js';
import MotoristaAuthRoute from './routes/MotoristaAuthRoute.js';
import AdminRegisterRoute from './routes/AdminRegisterRoute.js';
import ValidateMotorista from './middlewares/ValidateMotorista.js';
import ValidateAdmin from './middlewares/ValidateAdmin.js';

import cookieParser from 'cookie-parser';
import RotaRegisterRoute from './routes/RotaRegisterRoute.js';
import PontoRegisterRoute from './routes/PontoRegisterRoute.js';
import PontoRotaRegisterRoute from './routes/PontoRotaRegisterRoute.js';
import { Ponto, PontoRota } from './models/database.js';









const env = dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser());



app.post('/register', MotoristaRegisterRoute)

app.post('/adminRegister', AdminRegisterRoute)


app.post('/login', MotoristaAuthRoute)
app.listen(process.env.PORT, () => {
    console.log(`Rodando em ${process.env.PORT}`)
})


app.get('/teste', ValidateMotorista, (req, res) => {
    try {
        res.send("toma")
        console.log("req.user", req.user)
    } catch (err) {
        console.error(err)
        res.status(500).send("erro no servidor")

    }
})

app.get('/admintest', ValidateMotorista, ValidateAdmin, (req, res) => {
    try {
        res.send("toma admin")
        console.log("req.user", req.user)
    } catch (err) {
        console.error(err)
        res.status(500).send("erro no servidor")

    }
});

app.post('/rotacreate', ValidateMotorista, ValidateAdmin, RotaRegisterRoute)
app.post('/pontocreate', ValidateMotorista, ValidateAdmin, PontoRegisterRoute)
app.post('/pontorotacreate', ValidateMotorista, ValidateAdmin, PontoRotaRegisterRoute)