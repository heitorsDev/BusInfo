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
import GetAllRotasRoute from './routes/GetAllRotasRoute.js';
import GetAllPontosRoute from './routes/GetAllPontosRoute.js';
import RotaAdminMetaUpdateRoute from './routes/RotaAdminMetaUpdateRoute.js';
import RotaAdminDeleteRoute from './routes/RotaAdminDeleteRoute.js';
import PontoAdminUpdateRoute from './routes/PontoAdminUpdateRoute.js';
import PontoAdminDeleteRoute from './routes/PontoAdminDeleteRoute.js';
import GetPontosFromRotaRoute from './routes/GetPontosFromRotaRoute.js';
import PontoRotaAdminUpdateRoute from './routes/PontoRotaAdminUpdateRoute.js';
import PontoRotaAdminDeleteRoute from './routes/PontoRotaAdminDeleteRoute.js';
import GetMotoristasFromRotaRoute from './routes/GetMotoristasFromRotaRoute.js';
import MotoristaRotaAdminUpdateRoute from './routes/MotoristaRotaAdminUpdateRoute.js';
import MotoristaRotaAdminDeleteRoute from './routes/MotoristaRotaAdminDeleteRoute.js';
import GetAllMotoristasRoute from './routes/GetAllMotoristasRoute.js';
import cors from 'cors';

const env = dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))

// Admin: atualizar metadados de rota (Name, Numero, Horario_partida, Maximo_passageiros)
app.put('/admin/rota/:id', ValidateMotorista, ValidateAdmin, RotaAdminMetaUpdateRoute)

// Admin: deletar rota
app.delete('/admin/rota/:id', ValidateMotorista, ValidateAdmin, RotaAdminDeleteRoute)

app.get('/getallrotas', GetAllRotasRoute)
app.get('/getallpontos', GetAllPontosRoute)
app.get('/getallmotoristas', ValidateMotorista, ValidateAdmin, GetAllMotoristasRoute)

// Admin: atualizar ponto (Localizacao)
app.put('/admin/ponto/:id', ValidateMotorista, ValidateAdmin, PontoAdminUpdateRoute)

// Admin: deletar ponto
app.delete('/admin/ponto/:id', ValidateMotorista, ValidateAdmin, PontoAdminDeleteRoute)

// Admin: listar pontos associados a uma rota (inclui Horario e id do relacionamento)
app.get('/admin/rota/:id/pontos', ValidateMotorista, ValidateAdmin, GetPontosFromRotaRoute)

// Admin: atualizar relacionamento ponto-rota (editar Horario ou reatribuir Ponto/Rota)
app.put('/admin/pontorota/:id', ValidateMotorista, ValidateAdmin, PontoRotaAdminUpdateRoute)

// Admin: deletar relacionamento ponto-rota
app.delete('/admin/pontorota/:id', ValidateMotorista, ValidateAdmin, PontoRotaAdminDeleteRoute)

// Admin: listar motoristas associados a uma rota (inclui Horario e id do relacionamento)
app.get('/admin/rota/:id/motoristas', ValidateMotorista, ValidateAdmin, GetMotoristasFromRotaRoute)

// Admin: atualizar relacionamento motorista-rota (editar Horario ou reatribuir Motorista/Rota)
app.put('/admin/motoristarota/:id', ValidateMotorista, ValidateAdmin, MotoristaRotaAdminUpdateRoute)

// Admin: deletar relacionamento motorista-rota
app.delete('/admin/motoristarota/:id', ValidateMotorista, ValidateAdmin, MotoristaRotaAdminDeleteRoute)

app.listen(process.env.PORT, () => {
    console.log(`Rodando em ${process.env.PORT}`)
})
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
app.put('/rotaupdate', ValidateMotorista, RotaUpdateRoute)
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

