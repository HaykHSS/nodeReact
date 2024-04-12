import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const notAuthenticated = !isAuthenticated();
  
  useEffect(() => {
    if (notAuthenticated) {
      navigate("/login");
    }
  });

  return notAuthenticated ? null : <Outlet />;
};
export default ProtectedRoute;