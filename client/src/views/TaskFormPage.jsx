import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { ArrowLeft } from "lucide-react";

function TaskFormPage() {
  return (
    <div className="h-screen min-w-2/6 bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center px-4">
      <div className="absolute left-3 top-2.5">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Volver</span>
        </Link>
      </div>
      <TaskForm />
    </div>
  );
}

export default TaskFormPage;
