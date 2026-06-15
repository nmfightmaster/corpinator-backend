import config from "../config/index.js";
import { getValidAccessToken } from "./EveSsoService.js";
import { EsiException } from "../exceptions/EsiException.js";
import CharacterDetail from "../models/CharacterDetail.js";

const baseUrl = config.eve.baseUrl;
const compatibilityDate = config.eve.compatibilityDate;
const userAgent = config.eve.userAgent;
const defaultHeaders = {
    "X-Compatibility-Date": compatibilityDate,
    "X-User-Agent": userAgent,
}

async function clientFetch(method: string, endpoint: string, accessToken?: string, options: RequestInit = {}) {
  const { headers : callerHeaders, ...rest } = options;
  const response = await fetch(baseUrl + endpoint, {
    ...rest,
    method,
    headers: {
      ...defaultHeaders,
      ...callerHeaders,
      ...(accessToken && {Authorization: `Bearer ${accessToken}`}),
    }
  })

  if (!response.ok) {
    throw new EsiException(
      response.status,
      `ESI request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response;
}

async function fetchCharacterDetail(characterId: number) {
  const accessToken = await getValidAccessToken(characterId);
  const response = await clientFetch("GET", `/characters/${characterId}`, accessToken)
  const data = (await response.json()) as CharacterDetail;
  return data;
}

export { fetchCharacterDetail };
