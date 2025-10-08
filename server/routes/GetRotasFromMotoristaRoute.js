import GetRotasFromMotorista from "../controllers/GetRotasFromMotorista.js";
async function GetRotasFromMotoristaRoute(req, res) {
    const IdMotorista = req.params.id;
    const taigual = (toString(IdMotorista) == toString(req.user.id))

    if (!taigual) {
        if (!req.user.admin) {
            return res.status(400).json({ message: "Unauthorized" });
        }
    } else {
        try {
            const Rotas = await GetRotasFromMotorista(IdMotorista);

            return res.status(200).json(Rotas.rotas);
        } catch (error) {
            console.error("Error in GetRotasFromMotoristaRoute:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}

export default GetRotasFromMotoristaRoute