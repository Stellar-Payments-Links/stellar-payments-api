import { randomUUID } from "crypto";
import { Payment, TxRecord } from "../types/models";

const payments: Payment[] = [];
const transactions: TxRecord[] = [];

export const storageService = {
  createPayment(input: Omit<Payment, "id" | "status" | "createdAt">): Payment {
    const payment: Payment = {
      ...input,
      id: randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    payments.push(payment);
    return payment;
  },
  getPayment(id: string): Payment | undefined {
    return payments.find((p) => p.id === id);
  },
  listPayments(): Payment[] {
    return [...payments];
  },
  markPaid(paymentId: string) {
    const payment = payments.find((p) => p.id === paymentId);
    if (payment) payment.status = "paid";
  },
  saveTransaction(input: Omit<TxRecord, "id" | "createdAt">): TxRecord {
    const tx: TxRecord = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
    transactions.unshift(tx);
    return tx;
  },
  listTransactions(paymentId?: string): TxRecord[] {
    return paymentId ? transactions.filter((t) => t.paymentId === paymentId) : transactions;
  }
};
