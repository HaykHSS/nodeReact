import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import purchaseController from "./purchase.controller";
const router = Router();

router.get("/", authMiddleware.validateAccessToken,authMiddleware.isAdmin, purchaseController.getPurchases);
router.get("/:id",authMiddleware.validateAccessToken,  purchaseController.getPurchasesByUserId);
router.post("/",authMiddleware.validateAccessToken,  purchaseController.createPurchase);

export default router;
