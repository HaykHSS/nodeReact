import AuthStore from "@/store/AuthStore";
import ProductStore, { IProduct } from "@/store/ProductsStore";
import React, { useEffect, useState } from "react";

const Products = () => {
  const { products, getProducts, updateProduct } = ProductStore();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const { accessToken } = AuthStore();
  const startEdit = (product: IProduct) => {
    setEditProductId(product._id);
    setEditedName(product.productName);
    setEditedPrice(product.productPrice.toString());
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "productName") {
      setEditedName(value);
    } else if (name === "productPrice") {
      setEditedPrice(value);
    }
  };

  const saveEdit = async (productId: string) => {
    try {
      await updateProduct(productId, editedName, parseInt(editedPrice));
      // Here you could refresh the list of products or update the state directly
      getProducts();
      setEditProductId(null);
    } catch (e) {
      console.error("Failed to update product:", e);
    }
  };

  const handleAddProduct = () => {
    console.log("Adding product:", productName, productPrice);
    try {
      fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify({ productName, productPrice }),
      });
    } catch (e) {
      console.log(e);
    }
    window.location.reload();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-xl">Products</h1>
      <input
        className="border p-2 mr-2"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="border h-64 overflow-scroll ">
        <div className="grid grid-cols-3 text-md font-semibold text-left text-gray-500">
          <div className="px-4 py-2">Id</div>
          <div className="px-4 py-2">Product Name</div>
          <div className="px-4 py-2">Product Price</div>
        </div>
        {filteredProducts.map((product, index) => (
          <div
            key={product._id}
            className="grid grid-cols-3 text-md text-gray-700 bg-gray-100 border-b relative"
          >
            <div className="px-4 py-2">{index + 1}</div>
            <div className="px-4 py-2">
              {editProductId === product._id ? (
                <input
                  name="productName"
                  value={editedName}
                  onChange={handleEditChange}
                  className="border p-1"
                />
              ) : (
                product.productName
              )}
            </div>
            <div className="px-4 py-2">
              {editProductId === product._id ? (
                <input
                  name="productPrice"
                  type="number"
                  value={editedPrice}
                  onChange={handleEditChange}
                  className="border p-1 w-20"
                />
              ) : (
                `$${product.productPrice}`
              )}
            </div>
            <div className="absolute top-[50%] translate-y-[-50%] right-0 px-4 py-2">
              {editProductId === product._id ? (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => saveEdit(product._id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => startEdit(product)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          placeholder="Product price"
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddProduct}
        >
          Add New Product
        </button>
      </div>
    </div>
  );
};

export default Products;
