import config from "../config/index.js";
import { getValidAccessToken } from "./EveSsoService.js";
import { EsiException } from "../exceptions/EsiException.js";
import CharacterDetail from "../models/CharacterDetail.js";
import EveRateLimit from "../models/EveRateLimit.js";
import EveErrorLimit from "../models/EveErrorLimit.js";
import logger from "../loaders/logger.js";

const characterRateLimitMap = new Map<number, EveRateLimit>();
const ESI_DEFAULT_STANDARD_LIMIT = 150;
const ESI_DEFAULT_ERROR_LIMIT = 100;
let publicRateLimit: EveRateLimit = {
  remaining: ESI_DEFAULT_STANDARD_LIMIT,
  limit: ESI_DEFAULT_STANDARD_LIMIT,
};
let errorRateLimit: EveErrorLimit = {
  remaining: ESI_DEFAULT_ERROR_LIMIT,
};

const baseUrl = config.eve.baseUrl;
const compatibilityDate = config.eve.compatibilityDate;
const userAgent = config.eve.userAgent;
const defaultHeaders = {
  "X-Compatibility-Date": compatibilityDate,
  "X-User-Agent": userAgent,
};

async function clientFetch(
  method: string,
  endpoint: string,
  characterId?: number,
  accessToken?: string,
  options: RequestInit = {},
) {
  const rateLimit = getOrInitializeRateLimit(characterId);
  if (rateLimit.blockedUntil && rateLimit.blockedUntil > Date.now()) {
    throw new EsiException(
      429,
      `ESI Standard Rate limited.`,
      Math.ceil((rateLimit.blockedUntil - Date.now()) / 1000),
    );
  }
  if (errorRateLimit.blockedUntil && errorRateLimit.blockedUntil > Date.now()) {
    throw new EsiException(
      429,
      `ESI Legacy Rate limited.`,
      Math.ceil((errorRateLimit.blockedUntil - Date.now()) / 1000),
    );
  }
  const { headers: callerHeaders, ...rest } = options;
  const response = await fetch(baseUrl + endpoint, {
    ...rest,
    method,
    headers: {
      ...defaultHeaders,
      ...callerHeaders,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
  if (response.status === 420) {
    const remaining = Number(response.headers.get("x-esi-error-limit-remain"));
    const limitReset = Number(response.headers.get("x-esi-error-limit-reset"));
    const blockedUntil = Date.now() + limitReset * 1000;
    errorRateLimit = { remaining, blockedUntil };
    throw new EsiException(
      response.status,
      `ESI error limit reached: ${response.status} ${response.statusText}`,
      limitReset ? limitReset : config.rateLimit.retryAfter,
    );
  }
  if (response.headers.get("x-ratelimit-remaining")) {
    const remaining = Number(response.headers.get("x-ratelimit-remaining"));
    const limit = parseRateLimitLimitHeader(
      response.headers.get("x-ratelimit-limit")!,
    );
    if (response.status === 429) {
      const retryAfter = Number(response.headers.get("retry-after"));
      const blockedUntil = Date.now() + retryAfter * 1000;
      setRateLimit({ remaining, limit, blockedUntil }, characterId);
      throw new EsiException(
        response.status,
        `ESI Rate limited: ${response.statusText}`,
        retryAfter ? retryAfter : config.rateLimit.retryAfter,
      );
    }
    if (remaining < config.rateLimit.throttleThreshold) {
      logger.warn(`Approaching EVE ESI Standard rate limit. ${remaining} calls remaining.`)
    }
    const returnedEveRateLimit = { remaining, limit };
    setRateLimit(returnedEveRateLimit, characterId);
  } else if (response.headers.get("x-esi-error-limit-remain")) {
    const remaining = Number(response.headers.get("x-esi-error-limit-remain"));
    if (remaining < config.rateLimit.throttleThreshold) {
      logger.warn(`Approaching EVE ESI Error/Legacy rate limit. ${remaining} errors remaining.`)
    }
    errorRateLimit = { ...errorRateLimit, remaining };
  }
  if (!response.ok) {
    throw new EsiException(
      response.status,
      `ESI request failed: ${response.status} ${response.statusText}`,
    );
  }
  return response;
}

function setRateLimit(state: EveRateLimit, characterId?: number) {
  if (characterId) {
    characterRateLimitMap.set(characterId, state);
  } else {
    publicRateLimit = state;
  }
}

function getOrInitializeRateLimit(characterId?: number): EveRateLimit {
  if (!characterId) {
    return publicRateLimit;
  }
  const characterRateLimit = characterRateLimitMap.get(characterId);
  if (!characterRateLimit) {
    const defaultRateLimit = {
      remaining: ESI_DEFAULT_STANDARD_LIMIT,
      limit: ESI_DEFAULT_STANDARD_LIMIT,
    };
    characterRateLimitMap.set(characterId, defaultRateLimit);
    return defaultRateLimit;
  }
  return characterRateLimit;
}

function parseRateLimitLimitHeader(rateLimitLimitHeader: string): number {
  if (!rateLimitLimitHeader) {
    throw new EsiException(502, "Can't parse rate limit without header.");
  }
  const limit = Number(rateLimitLimitHeader.split("/")[0]);
  return limit;
}

async function fetchCharacterDetail(characterId: number) {
  const accessToken = await getValidAccessToken(characterId);
  const response = await clientFetch(
    "GET",
    `/characters/${characterId}`,
    characterId,
    accessToken,
  );
  const data = (await response.json()) as CharacterDetail;
  return data;
}

export { fetchCharacterDetail };
