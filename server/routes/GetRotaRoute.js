import GetRotaByNumber from "../controllers/GetRotaByNumber.js"; // Importa o controlador responsável por buscar uma rota pelo número

// Função que define a rota para buscar uma rota pelo número
async function GetRotaRoute(req, res) {
    // Extrai o parâmetro "numero" da URL da requisição
    const numero = req.params.numero;

    try {
        // Loga os dados recebidos para depuração
        console.log("Received data:", { numero });

        // Chama a função GetRotaByNumber para buscar a rota correspondente ao número
        const result = await GetRotaByNumber(numero);

        // Loga o resultado retornado pela função para depuração
        console.log(result);

        // Verifica se a busca foi bem-sucedida
        if (result.success) {
            console.log("sucesso"); // Loga uma mensagem de sucesso no console
            // Retorna a rota encontrada com status 200
            res.status(200).json({ rota: result.rota });
        } else {
            console.log("result.message", result.message); // Loga a mensagem de erro no console
            // Retorna uma resposta de erro com status 404 e a mensagem correspondente
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        // Em caso de erro, loga o erro no console
        console.error("Error in GetRotaRoute:", error);
        // Retorna uma resposta de erro interno do servidor com status 500
        res.status(500).json({ message: "Internal server error" });
    }
}

export default GetRotaRoute; // Exporta a função para ser usada em outros arquivos