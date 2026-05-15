import { Router } from "express";
import { paymentsController } from "../controllers/paymentsController";
import { validateCreatePayment, validatePay } from "../middleware/validate";
import { idempotency } from "../middleware/idempotency";

const router = Router();

router.get("/payments", paymentsController.list);
router.post("/payments", validateCreatePayment, paymentsController.create);
router.get("/payments/:id", paymentsController.getOne);
router.post("/payments/pay", validatePay, idempotency, paymentsController.process);

export default router;
