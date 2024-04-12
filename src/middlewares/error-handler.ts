import { Request, Response, NextFunction } from "express";
import CustomHttpError from "../exceptions/CustomHttpError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const statusCode = err instanceof CustomHttpError ? err.statusCode : 500;
  res
    .status(statusCode)
    .json({ value: null, message: err.message, status: "error" });
};

export default errorHandler;
