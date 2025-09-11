import bcrypt from "bcrypt";
import { Motorista } from "../models/database.js";

async function MotoristaRegister(Name, Password, CPF) {
  const hashedPassword = await bcrypt.hash(Password, 10);

  try {
    await Motorista.create({
      Name,
      Password: hashedPassword,
      CPF,
    });

    return { success: true, message: "Motorista created successfully" };
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return { success: false, message: "Motorista already exists" };
    } else {
      console.error(e);
      return { success: false, message: "Internal error" };
    }
  }
}

export default MotoristaRegister;
