import PontoRotaAdminUpdate from "../controllers/PontoRotaAdminUpdate.js";

async function PontoRotaAdminUpdateRoute(req, res) {
  const { id } = req.params;
  const payload = req.body;
  try {
    const result = await PontoRotaAdminUpdate(id, payload);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "PontoRota atualizado", pontoRota: result.pontoRota });
  } catch (error) {
    console.error("Error in PontoRotaAdminUpdateRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default PontoRotaAdminUpdateRoute;
