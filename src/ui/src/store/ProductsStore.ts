import { create } from "zustand";
import AuthStore from "./AuthStore";

export interface IProduct {
  _id: string;
  productName: string;
  productPrice: number;
  isInBasket?: boolean;
}

interface IProductsState {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  clearProducts: () => void;
  handleDrop: (id: string) => void;
  removeFromBasket: (id: string) => void;
  addToBasket: (id: string) => void;
  getProducts: () => Promise<void>;
  updateProduct: (
    productId: string,
    productName: string,
    productPrice: number
  ) => Promise<void>;
}

const getProducts = async () => {
  try {
    const response = await fetch("/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + AuthStore.getState().accessToken,
      },
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

const ProductStore = create<IProductsState>((set) => ({
  products: [],
  setProducts: (products: IProduct[]) => set({ products }),
  clearProducts: () => set({ products: [] }),
  handleDrop: (id: string) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? { ...product, isInBasket: true } : product
      ),
    }));
  },
  removeFromBasket: (id: string) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? { ...product, isInBasket: false } : product
      ),
    }));
  },
  addToBasket: (id: string) => {
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? { ...product, isInBasket: true } : product
      ),
    }));
  },
  async getProducts() {
    const products = await getProducts();
    set({ products });
  },
  async updateProduct(productId, productName, productPrice) {
    try {
      const product = await fetch(`/api/product/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + AuthStore.getState().accessToken,
        },
        body: JSON.stringify({
          productName,
          productPrice,
        }),
      });
      const data = await product.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
}));

export default ProductStore;
