import { env } from "../config/env";
import { TxRecord } from "../types/models";

export const webhookService = {
  async notifyPaymentConfirmed(payload: { paymentId: string; transaction: TxRecord }) {
    if (!env.webhookUrl) return;
    try {
      await fetch(env.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": env.webhookSecret
        },
        body: JSON.stringify({ event: "payment.confirmed", ...payload })
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("webhook delivery failed", err);
    }
  }
};
