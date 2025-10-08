
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
import RotaUpdateRoute from './routes/RotaUpdateRoute.js';
import GetRotaRoute from './routes/GetRotaRoute.js';
import MotoristaRotaRegisterRoute from './routes/MotoristaRotaRegisterRoute.js';
import GetRotasFromMotoristaRoute from './routes/GetRotasFromMotoristaRoute.js';
import cors from 'cors';
const env = dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}))

app.listen(process.env.PORT, () => {
    console.log(`Rodando em ${process.env.PORT}`)
})

//Rota de registro para usuarios comuns (motoristas)
app.post('/register', MotoristaRegisterRoute)
/*
schema:
{
    "Name": "Heitor Santos",
    "Password": "123456",
    "CPF": "01681209330"
}
*/ 

//Rota de registro para administradores
app.post('/adminRegister', AdminRegisterRoute)
/*
schema:
{
    "Name": "Heitor Santos 2",
    "Password": "123456",
    "CPF": "01681209331",
    "key": "souadmin"
}
*/

//Rota de login para todos os usuarios
app.post('/login', MotoristaAuthRoute)
/*
Adm:
    schema:
    {
        "CPF": "01681209331",
        "Password": "123456"
    }
Motorista:
    schema:
    {
        "CPF": "01681209330",
        "Password": "123456"
    }
*/

//Rota de criacao de rotas (somente admin)
app.post('/rotacreate', ValidateMotorista, ValidateAdmin, RotaRegisterRoute)
/*
schema:
{
"Name": "Aririri", 
"Numero": 363, 
"HorarioPartida": "08:00", 
"MaximoPassageiros": 40
}
*/

//Rota de criacao de pontos (somente admin)
app.post('/pontocreate', ValidateMotorista, ValidateAdmin, PontoRegisterRoute)
/*
schema:
{
"Localizacao": "Av. Paulista, 1000"
}
*/

//Rota de associacao de motorista a rota (somente admin)
app.post('/motoristaRotaRegister', ValidateMotorista, ValidateAdmin, MotoristaRotaRegisterRoute)
/*
schema:
{
"IdMotorista":1, 
"IdRota":1, 
"Horario":"08:00"
}
*/

//Rota de associacao de ponto a rota (somente admin)
app.post('/pontorotacreate', ValidateMotorista, ValidateAdmin, PontoRotaRegisterRoute)
/*
{"IdPonto":1, 
"IdRota":1, 
"Horario":"09:00"}
*/

/*TESTE: Deleta o token do motorista e loga como o outro motorista */

//Rota de atualizacao de rota (somente aos motoristas associados a rota)
app.post('/rotaupdate', ValidateMotorista, RotaUpdateRoute)
/*
{
"IdRota":1, 
"Numeropassageiros":20, 
"Ativa":true, 
"IdMotorista":1 
}
*/

//API pública para obter detalhes da rota pelo número da rota
app.get('/getrota/:numero', GetRotaRoute)
/*localhost:4000/getrota/363*/


app.get('/getmotoristarotas/:id', ValidateMotorista, GetRotasFromMotoristaRoute)