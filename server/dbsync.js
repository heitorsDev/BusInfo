
import { sequelize } from "./models/database.js";

(async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("sincronizado");
  } catch (error) {
    console.error("deu bolete: ", error);
  }
})();
