import PontoRotaRegister from "../controllers/PontoRotaRegister.js"; // Importa o controlador responsável por registrar um novo PontoRota

// Função que define a rota para registrar um novo PontoRota
async function PontoRotaRegisterRoute(req, res) {
    // Extrai os dados do corpo da requisição (IdPonto, IdRota, Horario)
    const { IdPonto, IdRota, Horario } = req.body;

    try {
        // Chama a função PontoRotaRegister para realizar o registro do novo PontoRota
        const result = await PontoRotaRegister(IdPonto, IdRota, Horario);

        // Verifica se o registro foi bem-sucedido
        if (result.success) {
            console.log("sucesso"); // Loga uma mensagem de sucesso no console
            // Retorna uma resposta de sucesso com status 200
            res.status(200).json({ message: "PontoRota created successfully" });
        } else {
            console.log("result.message", result.message); // Loga a mensagem de erro no console
            // Retorna uma resposta de erro com status 401 e a mensagem correspondente
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Error in PontoRotaRegisterRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Internal server error" });
    }
}

export default PontoRotaRegisterRoute; // Exporta a função para ser usada em outros arquivos