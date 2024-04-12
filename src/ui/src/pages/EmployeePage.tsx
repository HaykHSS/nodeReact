// App.tsx
import Basket from "@/components/employee/Basket";
import ProductList from "@/components/employee/ProductList";
import AuthStore from "@/store/AuthStore";
import ProductStore from "@/store/ProductsStore";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const { userRole } = AuthStore();
  const navigate = useNavigate();
  const { accessToken } = AuthStore();

  const { products, removeFromBasket, handleDrop, getProducts } =
    ProductStore();
  const basketItems = products.filter((product) => product.isInBasket);

  useEffect(() => {
    getProducts();
  }, [accessToken, getProducts]);

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin");
    }
  }, [navigate, userRole]);

  const handleDropAction = (id: string) => {
    handleDrop(id);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col justify-center items-center h-full gap-16">
        <h1 className="text-3xl">Employee Page</h1>
        <div className="flex justify-center items-center gap-52">
          <ProductList products={products} handleDrop={handleDropAction} />
          <Basket
            removeFromBasket={removeFromBasket}
            basketItems={basketItems}
            handleDrop={handleDropAction}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
