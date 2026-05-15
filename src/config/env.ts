import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  horizonUrl: process.env.HORIZON_URL || "https://horizon-testnet.stellar.org",
  networkPassphrase: process.env.STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015",
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 60),
  webhookUrl: process.env.WEBHOOK_URL || "",
  webhookSecret: process.env.WEBHOOK_SECRET || ""
};
