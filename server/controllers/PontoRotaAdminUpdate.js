import { PontoRota } from "../models/database.js";

async function PontoRotaAdminUpdate(id, payload) {
  try {
    const pr = await PontoRota.findByPk(id);
    if (!pr) return { success: false, status: 404, message: "PontoRota não encontrado" };

    const fields = {};
    if (payload?.Horario !== undefined) fields.Horario = payload.Horario;
    if (payload?.Ponto_id !== undefined) fields.Ponto_id = payload.Ponto_id;
    if (payload?.Rota_id !== undefined) fields.Rota_id = payload.Rota_id;

    await pr.update(fields);
    return { success: true, pontoRota: pr };
  } catch (error) {
    console.error("Error in PontoRotaAdminUpdate:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default PontoRotaAdminUpdate;
