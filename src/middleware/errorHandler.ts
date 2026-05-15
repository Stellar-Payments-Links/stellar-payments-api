import { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const message = err instanceof Error ? err.message : "Internal server error";
  // eslint-disable-next-line no-console
  console.error(JSON.stringify({ requestId: req.requestId, error: message }));
  res.status(500).json({ error: message, requestId: req.requestId });
}
