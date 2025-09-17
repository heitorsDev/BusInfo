import { Rota, Motorista } from "../models/database.js"; // Importa os modelos Rota e Motorista do banco de dados

// Função para atualizar uma rota
async function RotaUpdate(Id_Rota, Numero_passageiros, Ativa, Id_Motorista) {
    // Busca a rota pelo ID fornecido
    const rota = await Rota.findByPk(Id_Rota);
    if (!rota) {
        // Retorna uma mensagem de erro se a rota não for encontrada
        return { success: false, message: "Rota not found" };
    }

    // Busca o motorista pelo ID fornecido e verifica se ele está relacionado à rota
    const motorista = await Motorista.findByPk(Id_Motorista, {
        include: {
            model: Rota, // Inclui o modelo Rota para verificar a relação
            where: { Id: Id_Rota }, // Filtra pela rota específica
            required: true, // Garante que a relação seja obrigatória
        },
    });

    if (!motorista) {
        // Retorna uma mensagem de erro se o motorista não estiver relacionado à rota
        return { success: false, message: "Motorista is not related to this Rota" };
    }

    try {
        // Atualiza os campos da rota com os novos valores fornecidos
        await rota.update({
            Numero_passageiros, // Atualiza o número de passageiros
            Ativa, // Atualiza o status de atividade da rota
        });

        // Retorna uma mensagem de sucesso se a atualização for concluída
        return { success: true, message: "Rota updated successfully" };
    } catch (e) {
        // Loga o erro no console em caso de falha
        console.error(e);
        // Retorna uma mensagem de erro genérica
        return { success: false, message: "Internal error" };
    }
}

export default RotaUpdate; // Exporta a função para ser usada em outros arquivos