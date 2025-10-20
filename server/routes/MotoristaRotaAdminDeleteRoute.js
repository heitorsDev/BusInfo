import MotoristaRotaAdminDelete from "../controllers/MotoristaRotaAdminDelete.js";

async function MotoristaRotaAdminDeleteRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await MotoristaRotaAdminDelete(id);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "MotoristaRota deletado" });
  } catch (error) {
    console.error("Error in MotoristaRotaAdminDeleteRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default MotoristaRotaAdminDeleteRoute;
