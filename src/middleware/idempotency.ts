import { Request, Response, NextFunction } from "express";
import { idempotencyStore } from "../services/idempotencyStore";

export function idempotency(req: Request, res: Response, next: NextFunction) {
  const key = req.header("idempotency-key");
  if (!key) return next();
  const cached = idempotencyStore.get(key);
  if (cached) return res.status(cached.statusCode).json(cached.body);
  const originalJson = res.json.bind(res);
  res.json = (body: unknown) => {
    idempotencyStore.set(key, { statusCode: res.statusCode, body });
    return originalJson(body);
  };
  return next();
}
