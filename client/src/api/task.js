import axios from "axios";

const apiURI = "http://localhost:3000/api/tasks";

export const getTasksRequest = async () => {
  return await axios.get(apiURI, { withCredentials: true });
};

export const addTaskRequest = async (data) => {
  try {
    return await axios.post(apiURI, data, { withCredentials: true });
  } catch (error) {
    console.error("Error al agregar tarea: ", error);
  }
};
