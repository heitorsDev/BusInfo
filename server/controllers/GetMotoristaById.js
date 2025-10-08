import { Motorista } from "../models/database.js"; // Importa o modelo Motorista do banco de dados

// Função para buscar um motorista pelo ID
async function GetMotoristaById(Motorista_Id) {
    try {
        // Busca o motorista pelo ID (Primary Key) e exclui o campo "Password" dos resultados
        const motorista = await Motorista.findByPk(Motorista_Id, {
            attributes: { exclude: ['Password'] } // Exclui o campo "Password" por segurança
        });

        // Verifica se o motorista foi encontrado
        if (!motorista) {
            // Retorna uma mensagem de erro se o motorista não for encontrado
            return { success: false, message: "Motorista not found" };
        }

        // Retorna o motorista encontrado com uma mensagem de sucesso
        return { success: true, message: "Motorista retrieved successfully", motorista };
    } catch (error) {
        // Loga o erro no console em caso de falha
        console.error("Error retrieving Motorista:", error);
        // Retorna uma mensagem de erro genérica
        return { success: false, message: "Internal error" };
    }
}