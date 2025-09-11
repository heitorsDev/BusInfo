import AdminRegister from "../controllers/AdminRegister.js";
async function AdminRegisterRoute(req, res) {

  const { Name, Password, CPF, key } = req.body;

  try {
    console.log("Received data:", { Name, Password, CPF, key });
    const result = await AdminRegister(Name, Password, CPF, key);
    console.log(result)
    if (result.success) {
      console.log("suecesso")
      res.status(200).json({ message: "Authentication successful" });
    } else {
      console.log("result.message", result.message)
      res.status(401).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in MotoristaRegisterRoute:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export default AdminRegisterRoute;