import config from "../config/index.js";
import { getValidAccessToken } from "./EveSsoService.js";
import { EsiException } from "../exceptions/EsiException.js";
import CharacterDetail from "../models/CharacterDetail.js";

const baseUrl = config.eve.baseUrl;
const compatibilityDate = config.eve.compatibilityDate;

async function fetchCharacterDetail(characterId: number) {
  const accessToken = await getValidAccessToken(characterId);
  const response = await fetch(`${baseUrl}/characters/${characterId}`, {
    method: "GET",
    headers: {
      "X-Compatibility-Date": compatibilityDate,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new EsiException(
      response.status,
      `ESI request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as CharacterDetail;
  return data;
}

export { fetchCharacterDetail };
