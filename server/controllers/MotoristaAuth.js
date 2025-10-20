import { Motorista } from "../models/database.js"; // Importa o modelo Motorista do banco de dados
import bcrypt from "bcrypt"; // Importa a biblioteca bcrypt para comparar senhas
import jwt from "jsonwebtoken"; // Importa a biblioteca jsonwebtoken para gerar tokens JWT
import * as dotenv from "dotenv"; // Importa a biblioteca dotenv para carregar variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const JWT_SECRET = process.env.JWT_SECRET; // Obtém a chave secreta para assinar os tokens JWT

// Função para autenticar um motorista
async function MotoristaAuth(CPF, Password) {
  try {
    // Busca o motorista no banco de dados pelo CPF fornecido
    const motorista = await Motorista.findOne({ where: { CPF } });

    // Verifica se o motorista foi encontrado
    if (!motorista) {
      // Retorna uma mensagem de erro se o motorista não for encontrado
      return { success: false, message: "Motorista not found" };
    }
    // Compara a senha fornecida com a senha hashada armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(Password, motorista.Password);

    // Verifica se a senha é inválida
    if (!isPasswordValid) {
      // Retorna uma mensagem de erro se a senha estiver incorreta
      return { success: false, message: "Invalid password" };
    }

    // Gera um token JWT contendo informações do motorista (continuação do código...)
    const token = jwt.sign(
      { id: motorista.Id, name: motorista.Name, cpf: motorista.CPF, admin: motorista.Admin },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const user = { id: motorista.Id, name: motorista.Name, admin: motorista.Admin };
    return { success: true, message: "Authentication successful", token, user };
  } catch (error) {
    // Loga o erro no console em caso de falha
    console.error("Error during Motorista authentication:", error);
    // Retorna uma mensagem de erro genérica
    return { success: false, message: "Internal error" };
  }
}

export default MotoristaAuth; // Exporta a função para ser usada em outros arquivos