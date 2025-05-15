import Header from "../components/Header";
import Tasks from "../components/Tasks";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <Header />
      <Tasks />
    </div>
  );
}

export default Home;
