import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { token, role } = useUserContext();

  if (!token) {
    return <Navigate to="/inicio-sesion" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/pagina-usuario" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
