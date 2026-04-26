import { Request, Response } from "express";
import { storageService } from "../services/storageService";

export const transactionsController = {
  list(_req: Request, res: Response) {
    return res.json({ transactions: storageService.listTransactions() });
  }
};
