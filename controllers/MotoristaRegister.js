import bcrypt from "bcrypt"; // Importa a biblioteca bcrypt para realizar o hash de senhas
import { Motorista } from "../models/database.js"; // Importa o modelo Motorista do banco de dados

// Função para registrar um novo motorista
async function MotoristaRegister(Name, Password, CPF) {
  // Realiza o hash da senha fornecida
  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    // Cria um novo registro de motorista no banco de dados
    await Motorista.create({
      Name, // Nome do motorista
      Password: hashedPassword, // Senha hashada
      CPF, // CPF do motorista
    });

    // Retorna uma mensagem de sucesso se o registro for criado com sucesso
    return { success: true, message: "Motorista created successfully" };
  } catch (e) {
    // Verifica se o erro é uma violação de chave única (CPF já existente)
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Motorista already exists" };
    } else {
      // Loga outros erros no console
      console.error(e);
      // Retorna uma mensagem de erro genérica
      return { success: false, message: "Internal error" };
    }
  }
}

export default MotoristaRegister; // Exporta a função para ser usada em outros arquivos