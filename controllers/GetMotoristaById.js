import { Motorista } from "../models/database.js";

async function GetMotoristaById(Motorista_Id){
    try {
        const motorista = await Motorista.findByPk(Motorista_Id, {
            attributes: { exclude: ['Password'] } 
        });

        if (!motorista) {
            return { success: false, message: "Motorista not found" };
        }

        return { success: true, message: "Motorista retrieved successfully", motorista };
    } catch (error) {
        console.error("Error retrieving Motorista:", error);
        return { success: false, message: "Internal error" };
    }
}