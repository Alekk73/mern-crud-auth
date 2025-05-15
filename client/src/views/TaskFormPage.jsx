import TaskForm from "../components/TaskForm";
import Header from "../components/Header";

function TaskFormPage() {
  return (
    <div className="h-screen min-w-2/6 bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center px-4">
      <Header />
      <TaskForm />
    </div>
  );
}

export default TaskFormPage;
