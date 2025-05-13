import { useAuth } from "../context/AuthContext";

function Header() {
  const { logout, user } = useAuth();
  const handleClick = async (e) => {
    e.preventDefault();

    logout();
  };

  return (
    <header className="h-20 flex items-center justify-between px-10">
      <h1 className="text-xl font-semibold">OrganizaT</h1>
      <div className="flex items-center gap-3">
        <p>{user.username}</p>
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
