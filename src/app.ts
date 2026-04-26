import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes";
import transactionRoutes from "./routes/transactionRoutes";

export const app = express();

const allowedOrigins = (
  process.env.FRONTEND_ORIGIN ||
  "http://localhost:3000,https://stellar-payments-web.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use(paymentRoutes);
app.use(transactionRoutes);
