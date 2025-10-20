import { Ponto } from "../models/database.js";

async function PontoAdminDelete(id) {
  try {
    const ponto = await Ponto.findByPk(id);
    if (!ponto) {
      return { success: false, status: 404, message: "Ponto não encontrado" };
    }
    await ponto.destroy();
    return { success: true };
  } catch (error) {
    console.error("Error in PontoAdminDelete:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default PontoAdminDelete;
