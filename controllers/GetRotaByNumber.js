import { Rota } from "../models/database.js";
async function GetRotaByNumber(NumeroRota) {
  try {
    const rota = await Rota.findOne({ where: {Numero: NumeroRota}  });
    if (!rota) {
      return { success: false, message: "Rota not found" };
    }
    return { success: true, message: "Rota retrieved successfully", rota };
  } catch (error) {
    console.error("Error retrieving Rota:", error);
    return { success: false, message: "Internal error" };
  }

}

export default GetRotaByNumber