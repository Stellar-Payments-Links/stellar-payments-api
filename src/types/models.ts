export type PaymentStatus = "pending" | "paid";

export type Payment = {
  id: string;
  title: string;
  amount: string;
  destinationPublicKey: string;
  memo?: string;
  status: PaymentStatus;
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
