import bcrypt from "bcrypt"; // Importa a biblioteca bcrypt (não utilizada neste arquivo, pode ser removida)

// Importa o modelo Ponto e a instância do Sequelize
import { Ponto, sequelize } from "../models/database.js";

// Função para registrar um novo ponto
async function PontoRegister(Localizacao) {
    try {
        // Cria um novo registro de ponto no banco de dados com a localização fornecida
        const newPonto = await Ponto.create({
            Localizacao: Localizacao // Define o campo "Localizacao" com o valor fornecido
        });

        // Retorna uma mensagem de sucesso se o ponto for criado com sucesso
        return { success: true, message: "Ponto created successfully" };
    } catch (e) {
        // Verifica se o erro é uma violação de chave única (ponto já existente)
        if (e.name === 'SequelizeUniqueConstraintError') {
            return { success: false, message: "Ponto already exists" };
        } else {
            // Loga outros erros no console
            console.log(e);
            // Retorna uma mensagem de erro genérica
            return { success: false, message: "Internal server error" };
        }
    }
}

export default PontoRegister; // Exporta a função para ser usada em outros arquivos