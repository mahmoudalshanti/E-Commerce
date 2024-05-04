import { Navigate, Outlet } from "react-router-dom";
import { useUserDash } from "../context/UserProvider";

const RequireAuth = () => {
  const { user } = useUserDash();
  return user?.username ? <Outlet /> : <Navigate to={"/dash/signin"} />;
};

export default RequireAuth;
