import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { logout, user } = useAuth();
  const handleClick = async (e) => {
    e.preventDefault();

    logout();
  };

  return (
    <header className="w-full h-20 flex items-center justify-between px-4 sm:px-10">
      <div className="flex items-center gap-5">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl font-semibold">OrganizaT</h1>
        </Link>
        <p>Bienvenido, {user.username}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <Link to="/add-task">
          <button
            type="button"
            className="focus:outline-none text-white bg-purple-500 hover:bg-purple-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Agregar Tarea
          </button>
        </Link>
        <button
          onClick={handleClick}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
}

export default Header;
