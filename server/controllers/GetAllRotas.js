import { Rota } from "../models/database.js";

async function GetAllRotas() {
  try {
    const rotas = await Rota.findAll();
    return { success: true, rotas };
  } catch (error) {
    console.error("Error fetching all rotas:", error);
    return { success: false, message: "Internal error" };
  }
}

export default GetAllRotas;
