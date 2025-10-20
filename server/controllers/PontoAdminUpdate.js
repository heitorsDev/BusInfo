import { Ponto } from "../models/database.js";

async function PontoAdminUpdate(id, payload) {
  try {
    const ponto = await Ponto.findByPk(id);
    if (!ponto) {
      return { success: false, status: 404, message: "Ponto não encontrado" };
    }

    // Only allow updating Localizacao for now
    if (typeof payload.Localizacao === "string" && payload.Localizacao.trim() !== "") {
      ponto.Localizacao = payload.Localizacao;
    }

    await ponto.save();
    return { success: true, ponto };
  } catch (error) {
    console.error("Error in PontoAdminUpdate:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default PontoAdminUpdate;
