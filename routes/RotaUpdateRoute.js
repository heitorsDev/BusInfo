import RotaUpdate from "../controllers/RotaUpdate.js"

async function RotaUpdateRoute(req, res) {
    const { IdRota, Numeropassageiros, Ativa, IdMotorista } = req.body;

    try {
        const result = await RotaUpdate(IdRota, Numeropassageiros, Ativa, IdMotorista);

        if (result.success) {
            res.status(200).json({ message: "Rota updated successfully" });
        } else {
            res.status(401).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in RotaUpdateRoute:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export default RotaUpdateRoute