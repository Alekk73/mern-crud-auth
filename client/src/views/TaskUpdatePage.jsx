import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, ListTodo, Flag, AlignLeft } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { Link, useNavigate, useParams } from "react-router-dom";

function TaskUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTask, updateTask } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "0",
    status: "0",
    date: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const formatDateForInput = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0]; // Convertimos a YYYY-MM-DD
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTask(id);
      setFormData({
        title: response.title,
        description: response.description,
        priority: String(response.priority),
        status: String(response.status),
        date: formatDateForInput(response.date),
      });
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateWithTime = new Date(formData.date + "T12:00:00");

    const payload = {
      ...formData,
      date: dateWithTime.toISOString(),
    };

    try {
      await updateTask(payload, id);

      setMessage({
        text: `Tarea actualizada correctamente... Redirigiendo`,
        type: "success",
      });

      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      setMessage({
        text: "Error al actualizar la tarea. Intente nuevamente.",
        type: "error",
      });

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="h-screen min-w-2/6 bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center px-4">
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

      <div className="absolute left-3 top-2.5">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Volver</span>
        </Link>
      </div>

      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden mt-11">
        <div className="bg-purple-600 py-4 px-6">
          <h2 className="text-white text-2xl font-bold">Actualiza la tarea</h2>
          <p className="text-purple-200 mt-1">Organiza tus actividades</p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-4 space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ListTodo size={18} className="text-gray-400" />
              </div>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Tarea importante"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3 pointer-events-none">
                <AlignLeft size={18} className="text-gray-400" />
              </div>
            </div>
            <textarea
              name="description"
              id="decription"
              value={formData.description}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe la tarea"
              required
            ></textarea>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Prioridad
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3 pointer-events-none">
                <Flag size={18} className="text-gray-400" />
              </div>
            </div>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="0">Baja</option>
              <option value="1">Media</option>
              <option value="2">Alta</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Estado
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3 pointer-events-none">
                <Flag size={18} className="text-gray-400" />
              </div>
            </div>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="0">Pendiente</option>
              <option value="1">En progreso</option>
              <option value="2">Completada</option>
              <option value="3">Cancelada</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
            >
              Guardar Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskUpdatePage;
