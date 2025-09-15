
import { Rota } from "../models/database.js";
import { Motorista } from "../models/database.js";
async function getRotasFromMotorista(motoristaId) {
    const motorista = await Motorista.findByPk(motoristaId, {
      include: {
        model: Rota,
        through: { attributes: [] },  
      },
    });
  
    if (!motorista) {
      return { success: false, message: "Motorista not found" };
    }
    return { success: true, rotas: motorista.Rotas };
}