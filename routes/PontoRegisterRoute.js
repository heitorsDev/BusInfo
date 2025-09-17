import PontoRegister from "../controllers/PontoRegister.js"; // Importa o controlador responsável por registrar um novo ponto

// Função que define a rota para registrar um novo ponto
async function PontoRegisterRoute(req, res) {
    // Extrai o campo "Localizacao" do corpo da requisição
    const { Localizacao } = req.body;

    try {
        // Chama a função PontoRegister para realizar o registro do novo ponto
        const result = await PontoRegister(Localizacao);

        // Verifica se o registro foi bem-sucedido
        if (result.success) {
            console.log("sucesso"); // Loga uma mensagem de sucesso no console
            // Retorna uma resposta de sucesso com status 200
            res.status(200).json({ message: "Ponto created successfully" });
        } else {
            console.log("result.message", result.message); // Loga a mensagem de erro no console
            // Retorna uma resposta de erro com status 401 e a mensagem correspondente
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Error in PontoRegisterRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Internal server error" });
    }
}

export default PontoRegisterRoute; // Exporta a função para ser usada em outros arquivos