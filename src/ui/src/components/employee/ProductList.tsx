import React, { useState } from "react";
import DraggableProduct from "./DraggableProduct";
import { Product } from "./types";

interface ProductListProps {
  products: Product[];
  handleDrop: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, handleDrop }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleInputChange}
        className="border border-gray-300 px-3 py-2 rounded-md mb-4 w-full"
      />
      <div className="border px-12 py-9 flex flex-col gap-3 w-[400px] h-[550px] overflow-scroll">
        {filteredProducts.map((product) => (
          <DraggableProduct
            key={product._id}
            product={product}
            handleDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
