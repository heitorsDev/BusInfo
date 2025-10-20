import { PontoRota } from "../models/database.js";

async function PontoRotaAdminDelete(id) {
  try {
    const pr = await PontoRota.findByPk(id);
    if (!pr) return { success: false, status: 404, message: "PontoRota não encontrado" };
    await pr.destroy();
    return { success: true };
  } catch (error) {
    console.error("Error in PontoRotaAdminDelete:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default PontoRotaAdminDelete;
