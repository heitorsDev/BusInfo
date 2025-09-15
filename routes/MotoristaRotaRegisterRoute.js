import MotoristaRotaRegister from "../controllers/MotoristaRotaRegister.js";

async function MotoristaRotaRegisterRoute(req, res) {
    const {IdMotorista, IdRota} = req.body;

    try {
      const result = await MotoristaRegister(Name, Password, CPF);

      if (result.success) {
        console.log("suecesso")
        res.status(200).json({ message: "Authentication successful"});
      } else {
        console.log("result.message", result.message)
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in MotoristaRegisterRoute:", error);
      res.status(500).json({ message: "Internal server error" });
    }

}
export default MotoristaRotaRegisterRoute