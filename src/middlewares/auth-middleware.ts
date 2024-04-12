import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import CustomHttpError from "../exceptions/CustomHttpError";
import tokenService from "../token/token.service";

class AuthValidator {
  validateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        next(new CustomHttpError("Unauthorized - Invalid credentials", 401));
      }

      const userData = tokenService.validateAccessToken(token);

      if (userData) {
        req.body.user = userData;
        next();
      } else {
        next(new CustomHttpError("Unauthorized", 401));
      }
    } catch (err) {
      next(new CustomHttpError("Unauthorized - Invalid credentials", 401));
    }
  }
  async isAdmin(req, res, next) {
    if (req.body.user.payload.userRole !== "admin") {
      next(new CustomHttpError("Unauthorized - need admin permissions", 403));
      return;
    }
    next();
  }
}
export default new AuthValidator();
