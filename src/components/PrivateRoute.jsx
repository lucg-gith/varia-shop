import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const PrivateRoute = (props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
};

export { PrivateRoute };
