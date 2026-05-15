import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

const amountSchema = z.string().regex(/^\d+(\.\d+)?$/);
const keySchema = z.string().regex(/^G[A-Z2-7]{55}$/);

describe("validators", () => {
  it("accepts positive amounts", () => {
    assert.equal(amountSchema.safeParse("25").success, true);
    assert.equal(amountSchema.safeParse("1.5").success, true);
  });

  it("rejects invalid amounts", () => {
    assert.equal(amountSchema.safeParse("-1").success, false);
    assert.equal(amountSchema.safeParse("abc").success, false);
  });

  it("accepts valid public keys", () => {
    const key = "G" + "A".repeat(55);
    assert.equal(keySchema.safeParse(key).success, true);
  });

  it("rejects short public keys", () => {
    assert.equal(keySchema.safeParse("GABC").success, false);
  });
});
