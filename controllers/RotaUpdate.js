import { Rota, Motorista } from "../models/database.js";

async function RotaUpdate(Id_Rota, Numero_passageiros, Ativa, Id_Motorista) {
    const rota = await Rota.findByPk(Id_Rota);
    if (!rota) {
        return { success: false, message: "Rota not found" };
    }

    const motorista = await Motorista.findByPk(Id_Motorista, {
        include: {
            model: Rota,
            where: { Id: Id_Rota },
            required: true,
        },
    });

    if (!motorista) {
        return { success: false, message: "Motorista is not related to this Rota" };
    }

    try {
        await rota.update({
            Numero_passageiros,
            Ativa
        });
        return { success: true, message: "Rota updated successfully" };
    } catch (e) {
        console.error(e);
        return { success: false, message: "Internal error" };
    }
}

export default RotaUpdate;
