import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/user"}>Profile</Link>
        </li>
        <li>
          <Link to={"/app"}>App</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>
              {/* <Avatar small />
              <Avatar /> */}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </>
        )}
        {/* <li>
					<Link to={"/dashboard"}>Dashboard</Link>
				</li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
