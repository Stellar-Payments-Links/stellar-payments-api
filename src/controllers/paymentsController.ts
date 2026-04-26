import { Request, Response } from "express";
import { storageService } from "../services/storageService";
import { stellarService } from "../services/stellarService";

export const paymentsController = {
  create(req: Request, res: Response) {
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

    const tx = await stellarService.verifyTransaction(txHash);
    if (!tx || tx.successful !== true) return res.status(400).json({ error: "Unverified transaction hash" });

    storageService.markPaid(paymentId);
    const transaction = storageService.saveTransaction({ paymentId, txHash, payerPublicKey, amount });
    return res.json({ success: true, transaction });
  }
};
