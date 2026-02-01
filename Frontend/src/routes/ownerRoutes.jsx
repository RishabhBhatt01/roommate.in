import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const OwnerRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log("OWNER ROUTE USER:", user); // ✅ HERE, not outside

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "owner") {
    return <Navigate to="/home" replace />;
  }

  if (location.pathname === "/owner" && user.isOwnerDetailsComplete) {
    return <Navigate to="/room-info" replace />;
  }

  if (location.pathname === "/owner-dashboard" && !user.isCreatedRoom) {
    return <Navigate to="/room-info" replace />;
  }

  if (location.pathname === "/room-info" &&  user.isCreatedRoom) {
  return <Navigate to="/owner-dashboard" replace />;
  }

  return <Outlet />;
};

export default OwnerRoute;
