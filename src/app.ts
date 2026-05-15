import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import metricsRoutes from "./routes/metricsRoutes";
import { requestId } from "./middleware/requestId";
import { requestLogger } from "./middleware/requestLogger";
import { rateLimit } from "./middleware/rateLimit";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

export const app = express();

const allowedOrigins = (
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:3000,https://stellar-payments-web.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(requestId);
app.use(requestLogger);

app.use(
  cors({
    origin: allowedOrigins
  })
);
app.use(express.json());

app.get("/health", (_req, res) =>
  res.json({ ok: true, service: "stellar-payments-api", version: "0.2.0" })
);

app.use(rateLimit, paymentRoutes);
app.use(metricsRoutes);
app.use(transactionRoutes);
app.use(notFound);
app.use(errorHandler);
