import { Horizon } from "stellar-sdk";
import { env } from "../config/env";
import { paymentOperationMatches } from "./stellarVerify";

const server = new Horizon.Server(env.horizonUrl);

export const stellarService = {
  async getPaymentOperations(txHash: string) {
    const tx = await server.transactions().transaction(txHash).call();
    const ops = await server.operations().forTransaction(txHash).call();
    return { tx, operations: ops.records };
  },

  async verifyTransaction(txHash: string) {
    return server.transactions().transaction(txHash).call();
  },

  async verifyPayment(txHash: string, destination: string, amount: string) {
    const verified = await this.getPaymentOperations(txHash);
    if (!verified.tx || verified.tx.successful !== true) return false;
    return paymentOperationMatches(verified.operations as never[], destination, amount);
  }
};
