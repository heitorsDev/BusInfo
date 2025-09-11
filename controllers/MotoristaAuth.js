import { Motorista } from "../models/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function MotoristaAuth(CPF, Password) {
  try {
    const motorista = await Motorista.findOne({ where: { CPF } });

    if (!motorista) {
      return { success: false, message: "Motorista not found" };
    }

    const isPasswordValid = await bcrypt.compare(Password, motorista.Password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    const token = jwt.sign(
      { id: motorista.Id, name: motorista.Name, cpf: motorista.CPF, admin: motorista.Admin },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return { success: true, message: "Authentication successful", token };
  } catch (error) {
    console.error("Error during authentication:", error);
    return { success: false, message: "Internal error" };
  }
}

export default MotoristaAuth;
