import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTaks,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";

const taskRoutes = Router();

taskRoutes.get("/", authRequired, getTasks);
taskRoutes.get("/:id", authRequired, getTask);
taskRoutes.post("/", authRequired, validateSchema(taskSchema), createTask);
taskRoutes.delete("/:id", authRequired, deleteTask);
taskRoutes.put("/:id", authRequired, validateSchema(taskSchema), updateTaks);

export default taskRoutes;
