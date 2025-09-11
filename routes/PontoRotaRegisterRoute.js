import PontoRotaRegister from "../controllers/PontoRotaRegister.js";
async function PontoRotaRegisterRoute(req, res) {

    const {IdPonto, IdRota, Horario} = req.body;

    try {
      const result = await PontoRotaRegister(IdPonto, IdRota, Horario);

      if (result.success) {
        console.log("suecesso")
        res.status(200).json({ message: "PontoRota created successfully"});
      } else {
        console.log("result.message", result.message)
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in PontoRotaRegisterRoute:", error);
      res.status(500).json({ message: "Internal server error" });
    }

}

export default PontoRotaRegisterRoute;