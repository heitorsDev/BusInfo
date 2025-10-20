import { Rota } from "../models/database.js";

async function RotaAdminDelete(id) {
  try {
    const rota = await Rota.findByPk(id);
    if (!rota) {
      return { success: false, status: 404, message: "Rota não encontrada" };
    }
    await rota.destroy();
    return { success: true };
  } catch (error) {
    console.error("Error in RotaAdminDelete:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default RotaAdminDelete;
