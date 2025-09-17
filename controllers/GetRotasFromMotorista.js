import { Rota } from "../models/database.js"; // Importa o modelo Rota do banco de dados
import { Motorista } from "../models/database.js"; // Importa o modelo Motorista do banco de dados

// Função para buscar as rotas associadas a um motorista pelo ID do motorista
async function GetRotasFromMotorista(motoristaId) {
    // Busca o motorista pelo ID (Primary Key) e inclui as rotas associadas

    const motorista = await Motorista.findByPk(motoristaId, {
        include: {
            model: Rota, // Inclui o modelo Rota para obter as rotas associadas ao motorista
            through: { attributes: [] }, // Exclui os atributos da tabela de associação (MotoristaRota)
        },
    });

    // Verifica se o motorista foi encontrado
    if (!motorista) {
        // Retorna uma mensagem de erro se o motorista não for encontrado
        return { success: false, message: "Motorista not found" };
    }

    // Retorna as rotas associadas ao motorista com uma mensagem de sucesso
    return { success: true, rotas: motorista.Rota };
}

export default GetRotasFromMotorista; // Exporta a função para ser usada em outros arquivos