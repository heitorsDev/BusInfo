
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Rota", {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    Numero: { type: DataTypes.STRING, allowNull: false },
    Horario_partida: { type: DataTypes.TIME, allowNull: false },
    Ativa: { type: DataTypes.BOOLEAN, defaultValue: false },
    Numero_passageiros: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, { tableName: "Rotas", timestamps: false });
};
