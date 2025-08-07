import { Link, useNavigate } from "react-router-dom";
import { useCalendarStore } from "../store/useCalendarStore";
import ModeToggle from "../theme/ModeToggle";

const Navbar = () => {
  const user = useCalendarStore((s) => s.user);
  const clear = useCalendarStore((s) => s.clear);
  const navigate = useNavigate();

  const handleLogout = () => {
    clear(); // clear accessToken, user, and events
    navigate("/"); // go back to home
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gray-800 text-white px-6 py-4 shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className=" md:text-xl md:font-bold">
          📆 Meeting Viewer
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link to="/" className="hidden md:block hover:text-gray-300">
            Home
          </Link>
          <Link to="/meetings" className="hover:text-gray-300">
            Meetings
          </Link>

          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.picture}
                className="w-8 h-8 rounded-full border hidden"
                alt={user.name}
              />
              <span className="hidden sm:inline">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
