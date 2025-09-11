import { Motorista } from "../models/database.js";
import { Rota } from "../models/database.js";

async function MotoristaRotaRegister(Id_motorista, Id_rota, Horario) {
  try {


    const motorista = await Motorista.findByPk(Id_motorista);
    const rota = await Rota.findByPk(Id_rota);
    rota.addMotorista(motorista, { through: { Horario: Horario } });

    return { success: true, message: "MotoristaRota relationship created successfully" };
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "MotoristaRota already exists" };
    } else {
      console.error(e);
      return { success: false, message: "Internal error" };
    }
  }
}

export default MotoristaRotaRegister;
