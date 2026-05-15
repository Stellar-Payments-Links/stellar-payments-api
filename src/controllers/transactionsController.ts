import { Request, Response } from "express";
import { storageService } from "../services/storageService";
import { parsePagination, paginate } from "../utils/pagination";

export const transactionsController = {
  list(req: Request, res: Response) {
    const { page, limit } = parsePagination(req.query as Record<string, unknown>);
    const paymentId = typeof req.query.paymentId === "string" ? req.query.paymentId : undefined;
    const all = storageService.listTransactions(paymentId);
    const { data, meta } = paginate(all, page, limit);
    return res.json({ transactions: data, pagination: meta });
  }
};
