import GetAllPontos from "../controllers/GetAllPontos.js";

async function GetAllPontosRoute(req, res) {
  try {
    const result = await GetAllPontos();
    if (result.success) {
      return res.status(200).json({ message: result.pontos });
    }
    return res.status(500).json({ message: result.message || "Internal server error" });
  } catch (error) {
    console.error("Error in GetAllPontosRoute:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default GetAllPontosRoute;
