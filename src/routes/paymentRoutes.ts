import { Router } from "express";
import { paymentsController } from "../controllers/paymentsController";
import { validateCreatePayment, validatePay } from "../middleware/validate";

const router = Router();

router.post("/payments", validateCreatePayment, paymentsController.create);
router.get("/payments/:id", paymentsController.getOne);
router.post("/payments/pay", validatePay, paymentsController.process);

export default router;
