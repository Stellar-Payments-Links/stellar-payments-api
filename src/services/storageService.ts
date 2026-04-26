import { randomUUID } from "crypto";

export type Payment = {
  id: string;
  title: string;
  amount: string;
  destinationPublicKey: string;
  memo?: string;
  status: "pending" | "paid";
  createdAt: string;
};

export type TxRecord = {
  id: string;
  paymentId: string;
  txHash: string;
  amount: string;
  payerPublicKey: string;
  createdAt: string;
};

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
  markPaid(paymentId: string) {
    const payment = payments.find((p) => p.id === paymentId);
    if (payment) payment.status = "paid";
  },
  saveTransaction(input: Omit<TxRecord, "id" | "createdAt">): TxRecord {
    const tx: TxRecord = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
    transactions.unshift(tx);
    return tx;
  },
  listTransactions(): TxRecord[] {
    return transactions;
  }
};
