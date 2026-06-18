type EveRateLimit = {
  remaining: number;
  limit: number;
  blockedUntil?: number;
};

export default EveRateLimit;
