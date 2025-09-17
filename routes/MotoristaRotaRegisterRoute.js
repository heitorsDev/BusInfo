import MotoristaRotaRegister from "../controllers/MotoristaRotaRegister.js"; // Importa o controlador responsável por registrar um novo MotoristaRota

// Função que define a rota para registrar um novo MotoristaRota
async function MotoristaRotaRegisterRoute(req, res) {
    // Extrai os dados do corpo da requisição (IdMotorista, IdRota, Horario)
    const { IdMotorista, IdRota, Horario } = req.body;

    try {
        // Chama a função MotoristaRotaRegister para realizar o registro do novo MotoristaRota
        const result = await MotoristaRotaRegister(IdMotorista, IdRota, Horario);

        // Verifica se o registro foi bem-sucedido
        if (result.success) {
            console.log("sucesso"); // Loga uma mensagem de sucesso no console
            // Retorna uma resposta de sucesso com status 200
            res.status(200).json({ message: "MotoristaRota created successfully" });
        } else {
            console.log("result.message", result.message); // Loga a mensagem de erro no console
            // Retorna uma resposta de erro com status 401 e a mensagem correspondente
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Error in MotoristaRotaRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Internal server error" });
    }
}

export default MotoristaRotaRegisterRoute; // Exporta a função para ser usada em outros arquivos