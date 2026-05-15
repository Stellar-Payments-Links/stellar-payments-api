type Stored = { statusCode: number; body: unknown };

const store = new Map<string, Stored>();

export const idempotencyStore = {
  get(key: string) {
    return store.get(key);
  },
  set(key: string, value: Stored) {
    store.set(key, value);
  }
};
