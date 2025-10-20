import GetPontosFromRota from "../controllers/GetPontosFromRota.js";

async function GetPontosFromRotaRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await GetPontosFromRota(id);
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: result.pontos });
  } catch (error) {
    console.error("Error in GetPontosFromRotaRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default GetPontosFromRotaRoute;
