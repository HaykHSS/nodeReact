import CustomHttpError from "../exceptions/CustomHttpError";
import Product from "./product.model";

class ProductService {
  async createProduct(productName, productPrice) {
    try {
      const product = await Product.create({
        productName,
        productPrice,
      });
      return product;
    } catch (e) {
        throw new CustomHttpError("Product not created", 400);

    }
  }

  async updateProduct(productId, productName, productPrice) {
    try {
      const product = await Product.findByIdAndUpdate(
        productId,
        {
          productName,
          productPrice,
        },
        { new: true }
      );
      return product;
    } catch (e) {
      throw new CustomHttpError("Product not found", 404);
    }
  }

  async getProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (e) {
      throw new CustomHttpError("Products not found", 404);
    }
  }
}

export default new ProductService();
