import { createContext, useContext, useEffect, useState } from "react";
import {
  addTaskRequest,
  getTasksRequest,
  getTaskByIdRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../api/task";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context)
    throw new Error("useTask deberia estar dentro de TaskProvider.");

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) setTasks([]);
  }, [user]);

  const getTasks = async () => {
    try {
      const response = await getTasksRequest();
      setTasks(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    const response = await getTaskByIdRequest(id);
    return response.data;
  };

  const createTask = async (task) => {
    await addTaskRequest(task);
  };

  const updateTask = async (data, id) => {
    await updateTaskRequest(data, id);
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, getTask, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
