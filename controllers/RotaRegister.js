import { Rota } from "../models/database.js";

async function RotaRegister(Name, Numero, Horario_partida, Maximo_passageiros) {
  try {
    await Rota.create({
      Name,
      Numero,
      Horario_partida,
      Ativa: false,
      Numero_passageiros: 0,
      Maximo_passageiros,
    });

    return { success: true, message: "Rota created successfully" };
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Rota already exists" };
    } else {
      console.error(e);
      return { success: false, message: "Internal error" };
    }
  }
}

export default RotaRegister;
