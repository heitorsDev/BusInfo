import { Rota, Motorista } from "../models/database.js";

async function GetMotoristasFromRota(rotaId) {
  try {
    const rota = await Rota.findByPk(rotaId, {
      include: [
        {
          model: Motorista,
          attributes: ["Id", "Name", "CPF"],
          through: { attributes: ["Id"] },
        },
      ],
    });

    if (!rota) return { success: false, status: 404, message: "Rota não encontrada" };

    const motoristas = (rota.Motorista || rota.Motoristas || []).map((m) => ({
      Id: m.Id,
      Name: m.Name,
      CPF: m.CPF,
      MotoristaRotaId: m.MotoristaRota?.Id,
    }));

    return { success: true, motoristas };
  } catch (error) {
    console.error("Error in GetMotoristasFromRota:", error);
    return { success: false, status: 500, message: "Erro interno" };
  }
}

export default GetMotoristasFromRota;
