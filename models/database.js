/*
Tabela Pontos:
Id
Localização

Tabela Rotas:
Id
Name
Numero
Horario_partida
Ativa
Numero_passageiros

Tabela relacional Ponto_Rota:
Id
Ponto_id (FK de Pontos)
Rota_id
Horario

Tabela Motoristas:
Id
Name
Password
CPF

Tabela relacional Motorista_rota:
Id
Motorista_id (FK Motoristas)
Rota_id (FK rotas)
*/


import * as dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import definePonto from "./ponto.js";
import defineRota from "./rota.js";
import definePontoRota from "./ponto_rota.js";
import defineMotorista from "./motorista.js";
import defineMotoristaRota from "./motorista_rota.js";

const env = dotenv.config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres", 
});


const Ponto = definePonto(sequelize);
const Rota = defineRota(sequelize);
const PontoRota = definePontoRota(sequelize);
const Motorista = defineMotorista(sequelize);
const MotoristaRota = defineMotoristaRota(sequelize);

Rota.belongsToMany(Ponto, { through: PontoRota, foreignKey: "Rota_id" });
Ponto.belongsToMany(Rota, { through: PontoRota, foreignKey: "Ponto_id" });

Motorista.belongsToMany(Rota, { through: MotoristaRota, foreignKey: "Motorista_id" });
Rota.belongsToMany(Motorista, { through: MotoristaRota, foreignKey: "Rota_id" });

export { sequelize, Ponto, Rota, PontoRota, Motorista, MotoristaRota };
