import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import productController from "./product.controller";
const router = Router();

router.get("/", authMiddleware.validateAccessToken, productController.getProducts);
router.post("/",authMiddleware.validateAccessToken, authMiddleware.isAdmin, productController.createProduct);
router.patch("/:id",authMiddleware.validateAccessToken, authMiddleware.isAdmin, productController.updateProduct);

export default router;
