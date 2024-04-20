// Navbar.js
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="bg-indigo-800 py-4 sticky top-0">
      <ul className="flex justify-between items-center px-8">
        <li>
          <Link to={"/"} className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to={"/user"} className="text-white hover:text-gray-300">
            Profile
          </Link>
        </li>
        <li>
          <Link to={"/app"} className="text-white hover:text-gray-300">
            App
          </Link>
        </li>
        <li className="flex items-center">
          {" "}
          {/* Add flex class here */}
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="text-white hover:text-gray-300 ml-4"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to={"/signup"} className="text-white hover:text-gray-300">
                Signup
              </Link>
              <Link
                to={"/login"}
                className="text-white hover:text-gray-300 ml-4"
              >
                Login
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
