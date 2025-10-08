import { Rota } from "../models/database.js"; // Importa o modelo Rota do banco de dados

// Função para buscar uma rota pelo número
async function GetRotaByNumber(NumeroRota) {
  try {
    // Busca a rota no banco de dados onde o campo "Numero" corresponde ao "NumeroRota" fornecido
    const rota = await Rota.findOne({ where: { Numero: NumeroRota } });

    // Verifica se a rota foi encontrada
    if (!rota) {
      // Retorna uma mensagem de erro se a rota não for encontrada
      return { success: false, message: "Rota not found" };
    }

    // Retorna a rota encontrada com uma mensagem de sucesso
    return { success: true, message: "Rota retrieved successfully", rota };
  } catch (error) {
    // Loga o erro no console em caso de falha
    console.error("Error retrieving Rota:", error);
    // Retorna uma mensagem de erro genérica
    return { success: false, message: "Internal error" };
  }
}

export default GetRotaByNumber; // Exporta a função para ser usada em outros arquivos