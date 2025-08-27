import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Motorista", {
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    Password: { type: DataTypes.STRING, allowNull: false },
    CPF: { type: DataTypes.STRING, unique: true, allowNull: false },
  }, { tableName: "Motoristas", timestamps: false });
};
