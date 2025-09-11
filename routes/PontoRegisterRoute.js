import PontoRegister from "../controllers/PontoRegister.js";
async function PontoRegisterRoute(req, res) {

    const {Localizacao} = req.body;

    try {
      const result = await PontoRegister(Localizacao);

      if (result.success) {
        console.log("suecesso")
        res.status(200).json({ message: "Ponto created successfully"});
      } else {
        console.log("result.message", result.message)
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in PontoRegisterRoute:", error);
      res.status(500).json({ message: "Internal server error" });
    }

}

export default PontoRegisterRoute;