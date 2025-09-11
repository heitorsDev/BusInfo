

import bcrypt from "bcrypt"
/*export default (sequelize) => {
  return sequelize.define("Rota", {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    Numero: { type: DataTypes.STRING, allowNull: false },
    Horario_partida: { type: DataTypes.TIME, allowNull: false },
    Ativa: { type: DataTypes.BOOLEAN, defaultValue: false },
    Numero_passageiros: { type: DataTypes.INTEGER, defaultValue: 0 },
    Maximo_passageiros: {type: DataTypes.INTEGER, defaultValue: 30}
  }, { tableName: "Rotas", timestamps: false });
};
*/

import { Ponto, sequelize } from "../models/database.js";

async function PontoRegister(Localizacao) {

    try {
        const newPonto = await Ponto.create({
            Localizacao: Localizacao
        })
        return  { success: true, message: "Ponto created successfully" };
    } catch (e){
        if (e.name === 'SequelizeUniqueConstraintError'){
            return { success: false, message: "Ponto already exists" };
        } else {
            console.log(e)
            return { success: false, message: "Internal server error" }
        }
    }

}
export default PontoRegister