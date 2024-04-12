import PurchaseService from "./purchase.service";

class PurchaseController {
  async createPurchase(req, res, next) {
    try {
      const { productIds, totalPrice, userId } = req.body;
      const { username } = req.body.user.payload;
      const purchase = await PurchaseService.createPurchase({
        username,
        userId,
        products: productIds,
        totalPrice,
      });
      res.status(201).json(purchase);
    } catch (e) {
      next(e);
    }
  }

  async getPurchases(req, res, next) {
    try {
      const purchases = await PurchaseService.getPurchases();
      res.status(200).json(purchases);
    } catch (e) {
      next(e);
    }
  }

  async getPurchasesByUserId(req, res, next) {
    try {
      const { id: userId } = req.params;
      const purchases = await PurchaseService.getPurchasesByUserId(userId);
      res.status(200).json(purchases);
    } catch (e) {
      next(e);
    }
  }
}

export default new PurchaseController();
