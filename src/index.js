import app from "./app.js";
import { config } from "./config.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(config.PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${config.PORT}/api`);
});
