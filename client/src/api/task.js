import axios from "axios";

const apiURI = "http://localhost:3000/api/tasks";

export const getTasksRequest = async () => {
  return await axios.get(apiURI, { withCredentials: true });
};

export const getTaskByIdRequest = async (id) => {
  return await axios.get(`${apiURI}/${id}`, { withCredentials: true });
};

export const addTaskRequest = async (data) => {
  try {
    return await axios.post(apiURI, data, { withCredentials: true });
  } catch (error) {
    console.error("Error al agregar tarea: ", error);
  }
};

export const updateTaskRequest = async (data, id) => {
  return await axios.put(`${apiURI}/${id}`, data, { withCredentials: true });
};

export const deleteTaskRequest = async (id) => {
  return await axios.delete(`${apiURI}/${id}`, { withCredentials: true });
};
