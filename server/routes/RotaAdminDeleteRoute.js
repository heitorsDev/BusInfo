import RotaAdminDelete from "../controllers/RotaAdminDelete.js";

async function RotaAdminDeleteRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await RotaAdminDelete(id);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "Rota deletada" });
  } catch (error) {
    console.error("Error in RotaAdminDeleteRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default RotaAdminDeleteRoute;
