import { Navigate, Outlet , useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
//   if (user.isProfileComplete && location.pathname === "/user-address") {
//   return <Navigate to="/home" replace />;
// }

  return <Outlet />;
};

export default PrivateRoute;
