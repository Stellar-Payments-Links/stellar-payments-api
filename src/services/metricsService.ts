const counters = {
  requests: 0,
  paymentCreates: 0,
  paymentPays: 0,
  verificationFailures: 0
};

export const metricsService = {
  inc(key: keyof typeof counters) {
    counters[key] += 1;
  },
  snapshot() {
    return { ...counters, collectedAt: new Date().toISOString() };
  }
};
