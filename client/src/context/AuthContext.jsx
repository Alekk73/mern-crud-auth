import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  profileRequest,
  registerRequest,
} from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deberia estar dentro de AuthProvider.");

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verifica si existe una sesion activa en las cookies, con la ruta /PROFILE del backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await profileRequest();
        setUser(response.data);
        setIsAuth(true);
      } catch (error) {
        setUser(null);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (userData) => {
    try {
      const response = await registerRequest(userData);
      setUser(response.data.userSaved);
      setIsAuth(true);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const signIn = async (userData) => {
    try {
      const response = await loginRequest(userData);
      setUser(response.data.user);
      setIsAuth(true);
      return response;
    } catch (error) {
      setUser(null);
      setIsAuth(false);
      throw new Error(error);
    }
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, logout, user, isAuth, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
