import GetMotoristasFromRota from "../controllers/GetMotoristasFromRota.js";

async function GetMotoristasFromRotaRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await GetMotoristasFromRota(id);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: result.motoristas });
  } catch (error) {
    console.error("Error in GetMotoristasFromRotaRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default GetMotoristasFromRotaRoute;
