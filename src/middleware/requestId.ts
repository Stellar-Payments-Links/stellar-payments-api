import { randomUUID } from "crypto";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
    }
  }
}

export function requestId(req: Request, res: Response, next: NextFunction) {
  const id = (req.header("x-request-id") || randomUUID()).slice(0, 64);
  req.requestId = id;
  res.setHeader("x-request-id", id);
  next();
}
