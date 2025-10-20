import PontoRotaAdminDelete from "../controllers/PontoRotaAdminDelete.js";

async function PontoRotaAdminDeleteRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await PontoRotaAdminDelete(id);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "PontoRota deletado" });
  } catch (error) {
    console.error("Error in PontoRotaAdminDeleteRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default PontoRotaAdminDeleteRoute;
