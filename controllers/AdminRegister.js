import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { Motorista } from "../models/database.js";

dotenv.config();

const ADMIN_KEY = process.env.ADMIN_KEY;

async function AdminRegister(Name, Password, CPF, key) {
  if (key !== ADMIN_KEY) {
    return { success: false, message: "Invalid admin key" };
  }

  const hashedPassword = await bcrypt.hash(Password, 10);
  try {
    await Motorista.create({
      Name,
      Password: hashedPassword,
      CPF,
      Admin: true,
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

export default AdminRegister;
