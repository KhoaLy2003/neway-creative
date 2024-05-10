import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/AuthContext";

const RequiredAuth = ({ allowedRoles }) => {
  const { role } = useContext(UserContext);
  const location = useLocation();

  console.log(role);

  if (role) {
    return allowedRoles.includes(role) ? (
      <Outlet />
    ) : role === "ADMIN" || role === "CUSTOMER" ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequiredAuth;
