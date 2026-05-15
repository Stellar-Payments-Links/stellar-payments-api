# Webhooks

Event: `payment.confirmed`

```json
{
  "event": "payment.confirmed",
  "paymentId": "uuid",
  "transaction": { "id": "...", "txHash": "...", "amount": "25" }
}
```

Set `WEBHOOK_URL` and optional `WEBHOOK_SECRET` (sent as `X-Webhook-Secret`).
