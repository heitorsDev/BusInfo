import RotaAdminMetaUpdate from "../controllers/RotaAdminMetaUpdate.js";

async function RotaAdminMetaUpdateRoute(req, res) {
  const { id } = req.params;
  const payload = req.body;
  try {
    const result = await RotaAdminMetaUpdate(id, payload);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: "Rota atualizada", rota: result.rota });
  } catch (error) {
    console.error("Error in RotaAdminMetaUpdateRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default RotaAdminMetaUpdateRoute;
