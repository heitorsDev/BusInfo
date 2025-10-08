import jwt from 'jsonwebtoken'; // Importa a biblioteca jsonwebtoken para manipular tokens JWT
import * as dotenv from 'dotenv'; // Importa a biblioteca dotenv para carregar variáveis de ambiente
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Função middleware para validar se o usuário autenticado é um administrador
function ValidateAdmin(req, res, next) {
   // Loga o valor da propriedade "admin" do usuário para depuração


   // Verifica se o usuário possui a propriedade "admin" definida como true
   if (req.user.admin) {
      // Se for administrador, chama o próximo middleware ou rota
      next();
   } else {
      // Caso contrário, retorna uma resposta com status 401 (Não autorizado) e mensagem "Unauthorized"
      return res.status(401).send('Unauthorized');
   }
}

export default ValidateAdmin; // Exporta a função para ser usada como middleware em outros arquivos