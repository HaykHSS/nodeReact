import ProductService from "./product.service";

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { productName, productPrice } = req.body;
      const product = await ProductService.createProduct(
        productName,
        productPrice
      );
      res.status(201).json(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const {  productName, productPrice } = req.body;
      const productId = req.params.id;
      const product = await ProductService.updateProduct(
        productId,
        productName,
        productPrice
      );
      res.status(200).json(product);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json(products);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}

export default new ProductController()