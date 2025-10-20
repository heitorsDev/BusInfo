import GetAllRotas from "../controllers/GetAllRotas.js";

async function GetAllRotasRoute(req, res) {
  try {
    const result = await GetAllRotas();
    if (result.success) {
      return res.status(200).json({ message: result.rotas });
    }
    return res.status(500).json({ message: result.message || "Internal server error" });
  } catch (error) {
    console.error("Error in GetAllRotasRoute:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default GetAllRotasRoute;
