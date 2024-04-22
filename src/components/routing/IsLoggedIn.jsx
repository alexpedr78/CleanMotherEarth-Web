import useAuth from "../../context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

function IsLoggedIn() {
  const { isLoggedIn, isLoading } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}

export default IsLoggedIn;
