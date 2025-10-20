import { Rota } from "../models/database.js";

// Atualiza campos administrativos de uma rota (Name, Numero, Horario_partida, Maximo_passageiros)
async function RotaAdminMetaUpdate(id, payload) {
  try {
    const rota = await Rota.findByPk(id);
    if (!rota) {
      return { success: false, status: 404, message: "Rota não encontrada" };
    }

    const updatable = {};
    if (payload.Name !== undefined) updatable.Name = payload.Name;
    if (payload.Numero !== undefined) updatable.Numero = payload.Numero;
    if (payload.Horario_partida !== undefined) updatable.Horario_partida = payload.Horario_partida;
    if (payload.Maximo_passageiros !== undefined) updatable.Maximo_passageiros = payload.Maximo_passageiros;

    await rota.update(updatable);
    return { success: true, rota };
  } catch (error) {
    console.error("Error in RotaAdminMetaUpdate:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default RotaAdminMetaUpdate;
