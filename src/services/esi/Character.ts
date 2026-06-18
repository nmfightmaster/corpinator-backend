import { authenticatedFetch } from "../../clients/EsiClient.js";
import CharacterDetail from "../../models/CharacterDetail.js";

async function fetchCharacterDetail(characterId: number) {
  const response = await authenticatedFetch(
    "GET",
    `/characters/${characterId}`,
    characterId,
  );
  const data = (await response.json()) as CharacterDetail;
  return data;
}

export { fetchCharacterDetail };