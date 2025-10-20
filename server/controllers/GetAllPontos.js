import { Ponto } from "../models/database.js";

async function GetAllPontos() {
  try {
    const pontos = await Ponto.findAll();
    return { success: true, pontos };
  } catch (error) {
    console.error("Error fetching all pontos:", error);
    return { success: false, message: "Internal error" };
  }
}

export default GetAllPontos;
