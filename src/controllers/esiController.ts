import { Request, Response } from "express";
import { fetchCharacterDetail } from "../services/EsiService.js";

async function getCharacter(req: Request, res: Response) {
  const characterId = req.characterId;
  const characterInfo = await fetchCharacterDetail(characterId);
  return res.json(characterInfo);
}

export { getCharacter };
