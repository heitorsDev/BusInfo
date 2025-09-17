import MotoristaAuth from "../controllers/MotoristaAuth.js"; // Importa o controlador responsável por autenticar o motorista

// Função que define a rota para autenticar um motorista
async function MotoristaAuthRoute(req, res) {
    // Extrai os dados do corpo da requisição (CPF e Password)
    const { CPF, Password } = req.body;

    try {
        // Chama a função MotoristaAuth para realizar a autenticação do motorista
        const result = await MotoristaAuth(CPF, Password);

        // Verifica se a autenticação foi bem-sucedida
        if (result.success) {
            // Define um cookie chamado "token" com o token gerado e retorna uma resposta de sucesso com status 200
            res.status(200).cookie("token", result.token).json({ msg: "Login successful" });
        } else {
            // Retorna uma resposta de erro com status 401 e a mensagem correspondente
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Error in MotoristaAuthRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Internal server error" });
    }
}

export default MotoristaAuthRoute; // Exporta a função para ser usada em outros arquivos