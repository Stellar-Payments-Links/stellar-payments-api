import { Request, Response } from "express";
import { storageService } from "../services/storageService";
import { stellarService } from "../services/stellarService";
import { metricsService } from "../services/metricsService";
import { webhookService } from "../services/webhookService";

export const paymentsController = {
  list(_req: Request, res: Response) {
    return res.json({ payments: storageService.listPayments() });
  },

  create(req: Request, res: Response) {
    metricsService.inc("paymentCreates");
    const payment = storageService.createPayment(req.body);
    return res.status(201).json({ payment });
  },

  getOne(req: Request, res: Response) {
    const payment = storageService.getPayment(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment link not found" });
    return res.json({ payment });
  },

  async process(req: Request, res: Response) {
    const { paymentId, txHash, payerPublicKey, amount } = req.body;
    const payment = storageService.getPayment(paymentId);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    if (payment.status === "paid") return res.status(409).json({ error: "Payment already completed" });

    const valid = await stellarService.verifyPayment(txHash, payment.destinationPublicKey, amount);
    if (!valid) {
      metricsService.inc("verificationFailures");
      return res.status(400).json({ error: "Transaction does not match payment destination or amount" });
    }

    storageService.markPaid(paymentId);
    const transaction = storageService.saveTransaction({ paymentId, txHash, payerPublicKey, amount });
    await webhookService.notifyPaymentConfirmed({ paymentId, transaction });
    metricsService.inc("paymentPays");
    return res.json({ success: true, transaction });
  }
};
