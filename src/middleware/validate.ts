import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const createPaymentSchema = z.object({
  title: z.string().min(2),
  amount: z.string().regex(/^\d+(\.\d+)?$/),
  destinationPublicKey: z.string().startsWith("G"),
  memo: z.string().max(28).optional()
});

const paySchema = z.object({
  paymentId: z.string().min(1),
  txHash: z.string().min(10),
  payerPublicKey: z.string().startsWith("G"),
  amount: z.string().regex(/^\d+(\.\d+)?$/)
});

export function validateCreatePayment(req: Request, res: Response, next: NextFunction) {
  const parsed = createPaymentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return next();
}

export function validatePay(req: Request, res: Response, next: NextFunction) {
  const parsed = paySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  req.body = parsed.data;
  return next();
}
