import { useLoadingStore } from "@/store/LoadingStore";
import { Outlet } from "react-router-dom";
import Loading from "./common/Loading";
import useAuth from "@/hooks/useAuth";

const Layout = () => {
  const { isLoading } = useLoadingStore();
  const {logout, isAuthenticated} = useAuth();
  return (
    <div>
      {isAuthenticated() && <header className="h-11 bg-gray-100 border-b flex justify-end items-center px-14">
        <button className="border-blue-600 border px-3 py-1" onClick={logout}>Logout</button>
      </header>}
      {isLoading && <Loading />}
      <Outlet />
    </div>
  );
};
export default Layout;
