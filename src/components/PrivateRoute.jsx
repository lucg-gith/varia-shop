import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
};

export { PrivateRoute };
