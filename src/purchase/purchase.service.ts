import CustomHttpError from "../exceptions/CustomHttpError";
import User from "../user/user.model";
import Purchase from "./purchase.model";

class PurchaseService {
  async createPurchase({ userId, products, totalPrice, username }) {
    try {
      const purchase = await Purchase.create({
        userId,
        username,
        products,
        iat: Date.now(),
        totalPrice,
      });
      return purchase;
    } catch (e) {
      console.log(e);
      throw new CustomHttpError("Purchase not created", 400);
    }
  }

  async getPurchases() {
    try {
      const purchases = await Purchase.find().populate({
        path: "products",
        select: "productName",
      });
      return purchases || [];
    } catch (e) {
      console.log(e);
      throw new CustomHttpError("Purchases not found", 404);
    }
  }

  async getPurchasesByUserId(userId) {
    try {
      const purchases = await Purchase.find({ userId }).populate({
        path: "products",
        select: "productName",
      });
      return purchases;
    } catch (e) {
      throw new CustomHttpError("Purchases not found", 404);
    }
  }
}

export default new PurchaseService();
