type HorizonPayment = {
  type: string;
  to?: string;
  amount?: string;
  asset_type?: string;
};

export function paymentOperationMatches(
  operations: HorizonPayment[],
  destination: string,
  amount: string
) {
  return operations.some(
    (op) =>
      op.type === "payment" &&
      op.asset_type === "native" &&
      op.to === destination &&
      op.amount === amount
  );
}
