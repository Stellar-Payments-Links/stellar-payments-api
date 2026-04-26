import { Horizon } from "stellar-sdk";
import { env } from "../config/env";

const server = new Horizon.Server(env.horizonUrl);

export const stellarService = {
  async verifyTransaction(txHash: string) {
    return server.transactions().transaction(txHash).call();
  }
};
