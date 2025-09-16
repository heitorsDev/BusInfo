import MotoristaRotaRegister from "../controllers/MotoristaRotaRegister.js";

async function MotoristaRotaRegisterRoute(req, res) {
    const {IdMotorista, IdRota, Horario} = req.body;

    try {
      const result = await MotoristaRotaRegister(IdMotorista, IdRota, Horario);

      if (result.success) {
        console.log("suecesso")
        res.status(200).json({ message: "MotoristaRota created successfully"});
      } else {
        console.log("result.message", result.message)
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in MotoristaRotaRoute:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}
export default MotoristaRotaRegisterRoute