import { Motorista } from "../models/database.js";

async function GetAllMotoristas() {
  try {
    const motoristas = await Motorista.findAll({
      attributes: ["Id", "Name", "CPF"],
      order: [["Id", "ASC"]],
    });
    return { success: true, motoristas };
  } catch (error) {
    console.error("Error in GetAllMotoristas:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default GetAllMotoristas;
