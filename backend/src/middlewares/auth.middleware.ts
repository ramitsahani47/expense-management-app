import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";



export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ApiError(401, "Authorization header missing");
  }

  // Read Authorization header
  // Example:
  // Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
  const token = authHeader.split(" ")[1];

  // Check token exists
  if (!token) {
    throw new ApiError(401, "Token missing");
  }

    try {
      // Verify JWT token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

      // Save logged-in user data
      // So controllers can access:
      // (req as any).user.id
      // (req as any).user.email
      (req as any).user = decoded;

     
      // Continue to next middleware/controller
      next();
    } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};