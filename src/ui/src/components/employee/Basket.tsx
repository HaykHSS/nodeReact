// Basket.tsx
import React from "react";
import { useDrop } from "react-dnd";
import { Product } from "./types";
import AuthStore from "@/store/AuthStore";

interface BasketProps {
  basketItems: Product[];
  handleDrop: (_id: string) => void;
  removeFromBasket: (id: string) => void; // Add a method to remove an item from the basket
}

const Basket: React.FC<BasketProps> = ({
  basketItems,
  handleDrop,
  removeFromBasket,
}) => {
  const { accessToken, userId } = AuthStore();
  const totalPrice = basketItems.reduce(
    (acc, item) => acc + item.productPrice,
    0
  );

  const [, drop] = useDrop(() => ({
    accept: "PRODUCT",
    drop: (item: { _id: string }) => handleDrop(item._id),
  }));

  const handleBuyClick = () => {
    if (basketItems.length === 0) {
      return;
    }
    fetch("/api/purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        productIds: basketItems.map((item) => item._id),
        userId,
        totalPrice,
      }),
    });
    // window.location.reload();
  };

  return (
    <div
      ref={drop}
      className="border px-12 py-9 flex flex-col gap-3 w-[400px] h-[550px] overflow-scroll"
    >
      <div className="flex flex-col gap-3 overflow-auto grow">
        {basketItems.map((item) => (
          <div key={item._id} className="flex  items-center border p-3 gap-2">
            <span>{item.productName}</span>
            <span className="ml-auto">${item.productPrice}</span>
            <button
              onClick={() => removeFromBasket(item._id)}
              className="bg-red-500 text-white w-6 aspect-square rounded-full"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <p className="border py-1 px-4 w-full flex justify-between">
          <span>Total</span>
          <span>${totalPrice}</span>
        </p>
        <button onClick={handleBuyClick} className="border py-1 px-3">
          Buy
        </button>
      </div>
    </div>
  );
};

export default Basket;
