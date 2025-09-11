import RotaRegister from "../controllers/RotaRegister.js";
async function RotaRegisterRoute(req, res) {

    const {Name, Numero, HorarioPartida, MaximoPassageiros} = req.body;

    try {
      const result = await RotaRegister(Name, Numero, HorarioPartida, MaximoPassageiros);

      if (result.success) {
        console.log("suecesso")
        res.status(200).json({ message: "Rota created successfully"});
      } else {
        console.log("result.message", result.message)
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in RotaRegisterRoute:", error);
      res.status(500).json({ message: "Internal server error" });
    }

}

export default RotaRegisterRoute;