import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LoginView() {
  const { signIn, isAuth } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn(formData);

      setMessage({
        text: `${response.data.message}.. Redirigiendo`,
        type: "success",
      });

      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage({
        text: "Error al inicar sesión. Intente nuevamente.",
        type: "error",
      });
      console.log(error);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4">
      {message.text && (
        <div
          className={`absolute top-2.5 end-2.5 px-4 py-2 rounded-lg shadow-md text-sm font-medium transition-opacity duration-300
      ${
        message.type === "success"
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-red-100 text-red-800 border border-red-300"
      }
    `}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-600 py-6 px-8">
          <h2 className="text-white text-2xl font-bold">Iniciar Sesión</h2>
          <p className="text-purple-200 mt-1">Accede a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
            >
              Iniciar Sesión
              <LogIn size={18} className="ml-2" />
            </button>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Crear una cuenta
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
