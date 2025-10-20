import { MotoristaRota } from "../models/database.js";

async function MotoristaRotaAdminUpdate(id, payload) {
  try {
    const mr = await MotoristaRota.findByPk(id);
    if (!mr) return { success: false, status: 404, message: "MotoristaRota não encontrado" };

    const fields = {};
    if (payload?.Motorista_id !== undefined) fields.Motorista_id = payload.Motorista_id;
    if (payload?.Rota_id !== undefined) fields.Rota_id = payload.Rota_id;

    await mr.update(fields);
    return { success: true, motoristaRota: mr };
  } catch (error) {
    console.error("Error in MotoristaRotaAdminUpdate:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default MotoristaRotaAdminUpdate;
