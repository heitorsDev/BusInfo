import GetAllMotoristas from "../controllers/GetAllMotoristas.js";

async function GetAllMotoristasRoute(req, res) {
  try {
    const result = await GetAllMotoristas();
    if (!result.success) {
      return res.status(result.status || 500).json({ message: result.message || "Erro" });
    }
    return res.status(200).json({ message: result.motoristas });
  } catch (error) {
    console.error("Error in GetAllMotoristasRoute:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

export default GetAllMotoristasRoute;
