import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location.pathname]); // Re-check when route changes

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    // Dispatch event to notify NoteContext to clear notes
    window.dispatchEvent(new Event('tokenChanged'));
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-400" />
          <span className=" text-2xl text-blue-400 tracking-wide">
            NoteKeeper
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className={`hover:text-blue-400 transition ${
                  location.pathname === "/" ? "text-blue-400 font-semibold" : "text-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                to="/create"
                className={`hover:text-blue-400 transition ${
                  location.pathname === "/create" ? "text-blue-400 font-semibold" : "text-gray-300"
                }`}
              >
                Create Note
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-white font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`hover:text-blue-400 transition ${
                  location.pathname === "/login" ? "text-blue-400 font-semibold" : "text-gray-300"
                }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`hover:text-blue-400 transition ${
                  location.pathname === "/signup" ? "text-blue-400 font-semibold" : "text-gray-300"
                }`}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;