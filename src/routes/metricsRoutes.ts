import { Router } from "express";
import { metricsService } from "../services/metricsService";

const router = Router();
router.get("/metrics", (_req, res) => res.json(metricsService.snapshot()));
export default router;
