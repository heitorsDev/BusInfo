
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("PontoRota", {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Horario: { type: DataTypes.TIME, allowNull: false },
  }, { tableName: "Ponto_Rota", timestamps: false });
};
