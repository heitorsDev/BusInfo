import MotoristaRegister from "../controllers/MotoristaRegister.js"; // Importa o controlador responsável por registrar um novo motorista

// Função que define a rota para registrar um novo motorista
async function MotoristaRegisterRoute(req, res) {
    // Extrai os dados do corpo da requisição (Name, Password, CPF)
    const { Name, Password, CPF } = req.body;

    try {
        // Chama a função MotoristaRegister para realizar o registro do novo motorista
        const result = await MotoristaRegister(Name, Password, CPF);

        // Verifica se o registro foi bem-sucedido
        if (result.success) {
            console.log("sucesso"); // Loga uma mensagem de sucesso no console
            // Retorna uma resposta de sucesso com status 200
            res.status(200).json({ message: "Authentication successful" });
        } else {
            console.log("result.message", result.message); // Loga a mensagem de erro no console
            // Retorna uma resposta de erro com status 401 e a mensagem correspondente
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Error in MotoristaRegisterRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Internal server error" });
    }
}

export default MotoristaRegisterRoute; // Exporta a função para ser usada em outros arquivos