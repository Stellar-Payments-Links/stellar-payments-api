export function isValidStellarPublicKey(value: string) {
  return /^G[A-Z2-7]{55}$/.test(value);
}
