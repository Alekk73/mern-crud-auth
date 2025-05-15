import Header from "../components/Header";
import Task from "../components/Tasks";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <Header />
      <Task />
    </div>
  );
}

export default Home;
