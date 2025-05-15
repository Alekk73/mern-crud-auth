import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { useTasks } from "../context/TaskContext";

function Task() {
  const { getTasks, tasks } = useTasks();
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      getTasks();
    } catch (error) {
      if (error.response.status === 404)
        setMessage(error.response.data.message);
      console.error("Error al cargar las tareas.", error.response.data);
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {message && (
        <p className="text-center text-sm text-gray-600 mb-4">{message}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              idTask={task._id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              date={task.date}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-sm">
            No hay tareas por mostrar.
          </p>
        )}
      </div>
    </div>
  );
}

export default Task;
