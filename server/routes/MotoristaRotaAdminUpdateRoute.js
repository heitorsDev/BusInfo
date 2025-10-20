import MotoristaRotaAdminUpdate from "../controllers/MotoristaRotaAdminUpdate.js";

async function MotoristaRotaAdminUpdateRoute(req, res) {
  const { id } = req.params;
  const payload = req.body;
  try {
    const result = await MotoristaRotaAdminUpdate(id, payload);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "MotoristaRota atualizado", motoristaRota: result.motoristaRota });
  } catch (error) {
    console.error("Error in MotoristaRotaAdminUpdateRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default MotoristaRotaAdminUpdateRoute;
