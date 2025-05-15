import { useState } from "react";
import { Calendar, ListTodo, Flag, AlignLeft } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: 0,
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      date: new Date(formData.date),
    };

    try {
      const response = await createTask(payload);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-purple-600 py-6 px-8">
        <h2 className="text-white text-2xl font-bold">Crear Tarea</h2>
        <p className="text-purple-200 mt-1">Organiza tus actividades</p>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
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
            htmlFor="title"
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
  );
}

export default TaskForm;
