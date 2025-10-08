
import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Ponto", {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Localizacao: { type: DataTypes.STRING, allowNull: false },
  }, { tableName: "Pontos", timestamps: false });
};
