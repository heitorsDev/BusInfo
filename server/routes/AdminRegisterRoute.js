import AdminRegister from "../controllers/AdminRegister.js"; // Importa o controlador responsável por registrar um novo administrador

// Função que define a rota para registrar um novo administrador
async function AdminRegisterRoute(req, res) {
    // Extrai os dados do corpo da requisição (Name, Password, CPF, key)
    const { Name, Password, CPF, key } = req.body;

    try {
        // Loga os dados recebidos para depuração
        console.log("Received data:", { Name, Password, CPF, key });

        // Chama a função AdminRegister para realizar o registro do novo administrador
        const result = await AdminRegister(Name, Password, CPF, key);

        // Loga o resultado retornado pela função para depuração
        console.log(result);

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

export default AdminRegisterRoute; // Exporta a função para ser usada em outros arquivos