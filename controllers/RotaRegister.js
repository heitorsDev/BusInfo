import { Rota } from "../models/database.js"; // Importa o modelo Rota do banco de dados

// Função para registrar uma nova rota
async function RotaRegister(Name, Numero, Horario_partida, Maximo_passageiros) {
  try {
    // Cria um novo registro de rota no banco de dados
    await Rota.create({
      Name, // Nome da rota
      Numero, // Número identificador da rota
      Horario_partida, // Horário de partida da rota
      Ativa: false, // Define a rota como inativa inicialmente
      Numero_passageiros: 0, // Define o número inicial de passageiros como 0
      Maximo_passageiros, // Define o número máximo de passageiros permitido
    });

    // Retorna uma mensagem de sucesso se a rota for criada com sucesso
    return { success: true, message: "Rota created successfully" };
  } catch (e) {
    // Verifica se o erro é uma violação de chave única (rota já existente)
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Rota already exists" };
    } else {
      // Loga outros erros no console
      console.error(e);
      // Retorna uma mensagem de erro genérica
      return { success: false, message: "Internal error" };
    }
  }
}

export default RotaRegister; // Exporta a função para ser usada em outros arquivos