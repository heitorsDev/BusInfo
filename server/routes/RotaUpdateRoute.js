import RotaUpdate from "../controllers/RotaUpdate.js"; // Importa o controlador responsável por atualizar a rota

// Função que define a rota para atualizar uma rota
async function RotaUpdateRoute(req, res) {
    // Extrai os dados do corpo da requisição (IdRota, Numeropassageiros, Ativa, IdMotorista)
    const { IdRota, Numeropassageiros, Ativa, IdMotorista } = req.body;
    console.log(IdRota, Numeropassageiros, Ativa, IdMotorista)
    console.log(req.body)
    try {
        // Chama a função RotaUpdate para realizar a atualização da rota
        const result = await RotaUpdate(IdRota, Numeropassageiros, Ativa, IdMotorista);

        // Verifica se a atualização foi bem-sucedida
        if (result.success) {
            // Retorna uma resposta de sucesso com status 200
            res.status(200).json({ message: "Rota atualizada com sucesso" });
        } else {
            // Retorna uma resposta de erro com status 401 e a mensagem correspondente
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Erro na RotaUpdateRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

export default RotaUpdateRoute; // Exporta a função para ser usada em outros arquivos