import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

class authController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password, asAdmin } = req.body;

      const userData = await authService.registration({
        username,
        password,
        ...(asAdmin && {userRole: 'admin'})
      });

      return res.status(201).json({
        value: userData,
        message: "User successfully registered",
        status: "success",
      });
    } catch (err) {
      console.log(err);

      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const userData = await authService.login({ username, password });

      return res.status(200).json({
        value: userData,
        message: "User successfully logged in",
        status: "success",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default new authController();
