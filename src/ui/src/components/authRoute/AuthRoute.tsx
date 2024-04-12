import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.ts";
import { useEffect } from "react";
import AuthStore from "@/store/AuthStore.ts";

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { userRole } = AuthStore();

  const shouldRedirect = isAuthenticated();

  useEffect(() => {
    if (shouldRedirect) {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    }
  });

  return shouldRedirect ? null : <Outlet />;
};
export default AuthRoute;
