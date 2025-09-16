import GetRotaByNumber from "../controllers/GetRotaByNumber.js";
async function GetRotaRoute(req, res) {
  const numero = req.params.numero;
  try {
    console.log("Received data:", { numero });
    const result = await GetRotaByNumber(numero);
    console.log(result)
    if (result.success) {
      console.log("suecesso")
      res.status(200).json({ rota: result.rota });
    } else {
      console.log("result.message", result.message)
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in GetRotaRoute:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export default GetRotaRoute;