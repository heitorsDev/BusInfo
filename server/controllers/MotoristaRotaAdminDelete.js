import { MotoristaRota } from "../models/database.js";

async function MotoristaRotaAdminDelete(id) {
  try {
    const mr = await MotoristaRota.findByPk(id);
    if (!mr) return { success: false, status: 404, message: "MotoristaRota não encontrado" };
    await mr.destroy();
    return { success: true };
  } catch (error) {
    console.error("Error in MotoristaRotaAdminDelete:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default MotoristaRotaAdminDelete;
