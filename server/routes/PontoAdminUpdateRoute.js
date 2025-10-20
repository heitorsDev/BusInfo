import PontoAdminUpdate from "../controllers/PontoAdminUpdate.js";

async function PontoAdminUpdateRoute(req, res) {
  const { id } = req.params;
  const payload = req.body;
  try {
    const result = await PontoAdminUpdate(id, payload);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "Ponto atualizado", ponto: result.ponto });
  } catch (error) {
    console.error("Error in PontoAdminUpdateRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default PontoAdminUpdateRoute;
