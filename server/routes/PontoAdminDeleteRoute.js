import PontoAdminDelete from "../controllers/PontoAdminDelete.js";

async function PontoAdminDeleteRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await PontoAdminDelete(id);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "Ponto deletado" });
  } catch (error) {
    console.error("Error in PontoAdminDeleteRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default PontoAdminDeleteRoute;
