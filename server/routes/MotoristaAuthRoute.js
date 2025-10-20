import MotoristaAuth from "../controllers/MotoristaAuth.js"; // Importa o controlador responsável por autenticar o motorista

async function MotoristaAuthRoute(req, res) {
    // Extrai os dados do corpo da requisição (CPF e Password)
    const { CPF, Password } = req.body;

    try {
        // Chama a função MotoristaAuth para realizar a autenticação do motorista
        const result = await MotoristaAuth(CPF, Password);

        // Verifica se a autenticação foi bem-sucedida
        if (result.success) {
            // Define um cookie chamado "token" com o token gerado
            // Observação: para o navegador salvar o cookie em cross-origin,
            // o servidor precisa de CORS com credentials: true e origin específico.
            res
                .cookie("token", result.token, {
                    httpOnly: true, // impede acesso via JS
                    sameSite: "lax", // para localhost (3000->4000) funciona bem
                    secure: false, // defina como true em produção com HTTPS
                    maxAge: 24 * 60 * 60 * 1000, // 1 dia
                    path: "/",
                })
                .status(200)
                .json({ message: "Login successful", user: result.user });
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