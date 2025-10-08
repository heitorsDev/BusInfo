import { Ponto } from "../models/database.js"; // Importa o modelo Ponto do banco de dados
import { Rota } from "../models/database.js"; // Importa o modelo Rota do banco de dados

// Função para registrar uma relação entre um ponto e uma rota
async function PontoRotaRegister(Id_ponto, Id_rota, Horario) {
  try {
    // Busca o ponto pelo ID fornecido
    const ponto = await Ponto.findByPk(Id_ponto);
    console.log(ponto); // Loga o ponto encontrado para depuração

    // Busca a rota pelo ID fornecido
    const rota = await Rota.findByPk(Id_rota);
    console.log(rota); // Loga a rota encontrada para depuração

    // Adiciona a rota ao ponto, incluindo o campo "Horario" na tabela de associação
    await ponto.addRota(rota, { through: { Horario: Horario } });

    // Retorna uma mensagem de sucesso se a relação for criada com sucesso
    return { success: true, message: "PontoRota relationship created successfully" };
  } catch (e) {
    // Verifica se o erro é uma violação de chave única (relação já existente)
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "PontoRota already exists" };
    } else {
      // Loga outros erros no console
      console.error(e);
      // Retorna uma mensagem de erro genérica
      return { success: false, message: "Internal error" };
    }
  }
}

export default PontoRotaRegister; // Exporta a função para ser usada em outros arquivos