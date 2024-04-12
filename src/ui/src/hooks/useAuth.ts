import AuthStore from "@/store/AuthStore";

const useAuth = () => {
  const { userId, accessToken, loginHandler, logoutHandler, registerHandler } =
    AuthStore();

  const isAuthenticated = () => {
    return !!userId && !!accessToken;
  };

  const logout = () => {
    logoutHandler();
  };

  const login = async (username : string, password: string) => {
    await loginHandler(username, password);
  };

  const register = async (username: string, password: string, asAdmin: boolean) => {
    await registerHandler(username, password , asAdmin);
  };

  return {
    isAuthenticated,
    logout,
    login,
    register,
  };
};

export default useAuth;
