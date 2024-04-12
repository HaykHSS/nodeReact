import { Router } from "express";
import authMiddleware from "../middlewares/auth-middleware";
import authController from "./auth.controller";
const router = Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);

export default router;
