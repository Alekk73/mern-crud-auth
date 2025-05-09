import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes/router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

export default app;
