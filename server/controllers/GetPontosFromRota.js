import { Rota, Ponto } from "../models/database.js";

async function GetPontosFromRota(rotaId) {
  try {
    const rota = await Rota.findByPk(rotaId, {
      include: [{
        model: Ponto,
        attributes: ["Id", "Localizacao"],
        through: { attributes: ["Id", "Horario"] },
      }],
    });

    if (!rota) return { success: false, status: 404, message: "Rota não encontrada" };

    // Map to a clean array
    const pontos = (rota.Pontos || []).map((p) => ({
      Id: p.Id,
      Localizacao: p.Localizacao,
      // Through record is exposed as p.PontoRota by default
      PontoRotaId: p.PontoRota?.Id,
      Horario: p.PontoRota?.Horario,
    }));

    return { success: true, pontos };
  } catch (error) {
    console.error("Error in GetPontosFromRota:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default GetPontosFromRota;
