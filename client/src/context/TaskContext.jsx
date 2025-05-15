import { createContext, useContext, useEffect, useState } from "react";
import { addTaskRequest, getTasksRequest } from "../api/task";
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

  const createTask = async (task) => {
    const response = await addTaskRequest(task);
    return response;
  };

  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};
