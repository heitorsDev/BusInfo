import { Ponto } from "../models/database.js";
import { Rota } from "../models/database.js";

async function PontoRotaRegister(Id_ponto, Id_rota, Horario) {
  try {


    const ponto = await Ponto.findByPk(Id_ponto);  
    console.log(ponto)
    const rota = await Rota.findByPk(Id_rota);
    console.log(rota)
    await ponto.addRota(rota, { through: { Horario: Horario } });
    return { success: true, message: "PontoRota relationship created successfully" };
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "PontoRota already exists" };
    } else {
      console.error(e);
      return { success: false, message: "Internal error" };
    }
  }
}

export default PontoRotaRegister;
