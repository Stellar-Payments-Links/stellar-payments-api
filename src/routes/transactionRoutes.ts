import { Router } from "express";
import { transactionsController } from "../controllers/transactionsController";

const router = Router();

router.get("/transactions", transactionsController.list);

export default router;
