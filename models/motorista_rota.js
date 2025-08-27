
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("MotoristaRota", {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  }, { tableName: "Motorista_Rota", timestamps: false });
};
