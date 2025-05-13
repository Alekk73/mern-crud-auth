import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", router);

export default app;
