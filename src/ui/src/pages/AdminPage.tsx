import BuyersHistory from "@/components/admin/BuyersHistory";
import Products from "@/components/admin/Products";
import AuthStore from "@/store/AuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { userRole } = AuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userRole);
    if (userRole === "employee") {
      navigate("/employee");
    }
  }, [navigate, userRole]);

  return (
    <div className="flex flex-col justify-around items-center h-full">
      <h1 className="text-3xl">Admin Page</h1>
      <div className="flex flex-col justify-center items-center gap-24">
        <BuyersHistory />
        <Products />
      </div>
    </div>
  );
};
export default AdminPage;
