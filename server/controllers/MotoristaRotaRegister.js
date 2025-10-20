import { Motorista } from "../models/database.js"; // Importa o modelo Motorista do banco de dados
import { Rota } from "../models/database.js"; // Importa o modelo Rota do banco de dados

// Função para registrar uma relação entre um motorista e uma rota (sem Horario)
async function MotoristaRotaRegister(Id_motorista, Id_rota, Horario) {
  try {
    // Busca o motorista pelo ID fornecido
    const motorista = await Motorista.findByPk(Id_motorista);

    // Busca a rota pelo ID fornecido
    const rota = await Rota.findByPk(Id_rota);

    // Adiciona o motorista à rota (sem campo Horario na tabela de associação)
    await rota.addMotorista(motorista);

    // Retorna uma mensagem de sucesso se a relação for criada com sucesso
    return { success: true, message: "MotoristaRota relationship created successfully" };
  } catch (e) {
    // Verifica se o erro é uma violação de chave única (relação já existente)
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "MotoristaRota already exists" };
    } else {
      // Loga outros erros no console
      console.error(e);
      // Retorna uma mensagem de erro genérica
      return { success: false, message: "Internal error" };
    }
  }
}

export default MotoristaRotaRegister; // Exporta a função para ser usada em outros arquivos