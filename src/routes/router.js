import { Router } from "express";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./tasks.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

export default router;
