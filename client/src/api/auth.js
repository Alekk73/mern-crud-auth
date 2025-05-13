import axios from "axios";

const apiURL = "http://localhost:3000/api/auth";

export const registerRequest = async (credentials) => {
  return await axios.post(`${apiURL}/register`, credentials, {
    withCredentials: true,
  });
};

export const loginRequest = async (credentials) => {
  return await axios.post(`${apiURL}/login`, credentials, {
    withCredentials: true,
  });
};

export const profileRequest = async () => {
  return await axios.get(`${apiURL}/profile`, { withCredentials: true });
};

export const logoutRequest = async () => {
  return await axios.post(`${apiURL}/logout`, null, { withCredentials: true });
};
