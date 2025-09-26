import bcrypt from "bcrypt"; // Importa a biblioteca bcrypt para realizar o hash de senhas
import * as dotenv from "dotenv"; // Importa a biblioteca dotenv para carregar variáveis de ambiente
import { Motorista } from "../models/database.js"; // Importa o modelo Motorista do banco de dados

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const ADMIN_KEY = process.env.ADMIN_KEY; // Obtém a chave de administrador definida nas variáveis de ambiente

// Função para registrar um novo administrador
async function AdminRegister(Name, Password, CPF, key) {
  // Verifica se a chave fornecida é válida
  if (key !== ADMIN_KEY) {
    // Retorna uma mensagem de erro se a chave for inválida
    return { success: false, message: "Invalid admin key" };
  }

  // Realiza o hash da senha fornecida
  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    // Cria um novo registro de administrador no banco de dados
    await Motorista.create({
      Name, // Nome do administrador
      Password: hashedPassword, // Senha hashada
      CPF, // CPF do administrador
      Admin: true, // Define o campo Admin como true
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

export default AdminRegister; // Exporta a função para ser usada em outros arquivos