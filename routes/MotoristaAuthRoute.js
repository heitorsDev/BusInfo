import MotoristaAuth from "../controllers/MotoristaAuth.js";

async function MotoristaAuthRoute(req, res) {

    const { CPF, Password } = req.body;

    try {
      const result = await MotoristaAuth(CPF, Password);

      if (result.success) {
        
        res.status(200).cookie("token", result.token).json({msg: "Login successful"});
      } else {
        res.status(401).json({ message: result.message });
      }
    } catch (error) {
      console.error("Error in MotoristaAuthRoute:", error);
      res.status(500).json({ message: "Internal server error" });
    }

}

export default MotoristaAuthRoute;