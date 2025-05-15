import { AlertCircle, Trash2, Pencil, Eye } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

function TaskCard({ idTask, title, description, priority, status, date }) {
  const { getTask } = useTasks();
  const navigate = useNavigate();
  const priorityMap = {
    0: { label: "Baja", style: "bg-green-100 text-green-700" },
    1: { label: "Media", style: "bg-yellow-100 text-yellow-700" },
    2: { label: "Alta", style: "bg-red-100 text-red-700" },
  };

  const statusMap = {
    0: { label: "Pendiente", style: "bg-yellow-200 text-yellow-800" },
    1: { label: "En Proceso", style: "bg-blue-200 text-blue-800" },
    2: { label: "Completada", style: "bg-green-200 text-green-800" },
    3: { label: "Cancelada", style: "bg-gray-300 text-gray-800" },
  };

  return (
    <div className="relative group w-full h-48">
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity">
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 text-blue-600 hover:bg-blue-100 shadow-md transition">
          <Eye size={24} />
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 text-yellow-500 hover:bg-yellow-100 shadow-md transition">
          <Pencil size={24} />
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 text-red-600 hover:bg-red-100 shadow-md transition">
          <Trash2 size={24} />
        </button>
      </div>

      <div className="flex flex-col justify-between w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm p-4 transition group-hover:blur-sm">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <span
            className={`text-xs font-semibold px-2.5 py-1 mt-1 rounded-full ${statusMap[status]?.style}`}
          ></span>
        </div>

        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between gap-3 mt-4">
          <div
            className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${priorityMap[priority]?.style}`}
          >
            <AlertCircle size={14} />
            {priorityMap[priority]?.label || "Sin prioridad"}
          </div>

          <div className="flex items-center gap-2 bg-indigo-100 text-indigo-800 rounded-md px-3 py-1.5 text-xs font-medium shadow-sm">
            {new Date(date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
