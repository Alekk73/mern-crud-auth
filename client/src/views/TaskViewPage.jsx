import { useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Flag, Clock, CheckCircle } from "lucide-react";

function TaskView() {
  const { id } = useParams();
  const { getTask } = useTasks();
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response);
      } catch (error) {
        console.error("Error al obtener la tarea: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Cargando tarea...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-lg">Tarea no encontrada.</p>
        <Link to="/tasks" className="text-blue-500 underline mt-4 block">
          Volver a tareas
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Volver</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
          <div className="bg-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{task.title}</h1>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  statusMap[task.status].style
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                {statusMap[task.status].label}
              </span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  priorityMap[task.priority].style
                }`}
              >
                <Flag className="w-4 h-4 mr-1" />
                Prioridad: {priorityMap[task.priority].label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Fecha límite
                  </p>
                  <p>
                    {new Date(task.date).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
              {task.dueDate && (
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Fecha límite
                    </p>
                    <p>{formatDate(task.dueDate)}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Descripción
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">
                  {task.description}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Editar tarea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskView;
