import RotaRegister from "../controllers/RotaRegister.js"; // Importa o controlador responsável por registrar uma nova rota

// Função que define a rota para registrar uma nova rota
async function RotaRegisterRoute(req, res) {
    // Extrai os dados do corpo da requisição (Name, Numero, HorarioPartida, MaximoPassageiros)
    const { Name, Numero, HorarioPartida, MaximoPassageiros } = req.body;

    try {
        // Chama a função RotaRegister para realizar o registro da nova rota
        const result = await RotaRegister(Name, Numero, HorarioPartida, MaximoPassageiros);

        // Verifica se o registro foi bem-sucedido
        if (result.success) {
            console.log("sucesso"); // Loga uma mensagem de sucesso no console
            // Retorna uma resposta de sucesso com status 200
            res.status(200).json({ message: "Rota created successfully" });
        } else {
            console.log("result.message", result.message); // Loga a mensagem de erro no console
            // Retorna uma resposta de erro com status 401 e a mensagem correspondente
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Error in RotaRegisterRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Internal server error" });
    }
}

export default RotaRegisterRoute; // Exporta a função para ser usada em outros arquivos