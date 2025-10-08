import jwt, { decode } from 'jsonwebtoken'; // Importa a biblioteca jsonwebtoken para manipular tokens JWT
import * as dotenv from 'dotenv'; // Importa a biblioteca dotenv para carregar variáveis de ambiente
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Função middleware para validar o token JWT de um motorista
function ValidateMotorista(req, res, next) {
    // Obtém o token do cookie chamado "token"
    const token = req.cookies.token;

    // Verifica se o token não existe ou é indefinido
    if (!token || token === 'undefined') {
        // Retorna uma resposta com status 403 (Proibido) e mensagem "Unauthorized"
        return res.status(403).send('Unauthorized');
    }

    try {
        // Verifica e decodifica o token usando a chave secreta definida em JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Adiciona os dados decodificados do token ao objeto `req` para uso posterior
        req.user = decoded;

        // Chama o próximo middleware ou rota
        next();
    } catch (err) {
        // Em caso de erro ao verificar o token, loga o erro no console
        console.error(err);

        // Retorna uma resposta com status 401 (Não autorizado) e mensagem "Unauthorized"
        return res.status(401).send('Unauthorized');
    }
}

export default ValidateMotorista; // Exporta a função para ser usada como middleware em outros arquivos