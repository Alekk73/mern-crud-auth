import App from "./App";
import Home from "./views/Home";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  // Rutas Publicas
  { path: "/login", element: <LoginView /> },
  { path: "/register", element: <RegisterView /> },
  // Rutas Protegidas
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <Home /> }],
  },
]);
