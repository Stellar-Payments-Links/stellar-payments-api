import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = req.ip || "unknown";
  const now = Date.now();
  const entry = hits.get(key) || { count: 0, resetAt: now + env.rateLimitWindowMs };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + env.rateLimitWindowMs;
  }
  entry.count += 1;
  hits.set(key, entry);
  if (entry.count > env.rateLimitMax) {
    return res.status(429).json({ error: "Too many requests", retryAfterMs: entry.resetAt - now });
  }
  return next();
}
