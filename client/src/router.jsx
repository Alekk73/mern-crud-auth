import App from "./App";
import Home from "./views/Home";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskFormPage from "./views/TaskFormPage";
import TaskView from "./views/TaskViewPage";
import TaskUpdatePage from "./views/TaskUpdatePage";

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
    children: [
      { path: "", element: <Home /> },
      { path: "/add-task", element: <TaskFormPage /> },
      { path: "/task/:id", element: <TaskView /> },
      { path: "/update-task/:id", element: <TaskUpdatePage /> },
    ],
  },
]);
