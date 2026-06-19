import { Request, Response } from "express";
import {
  fetchCharacterDetail,
  fetchCharacterAssets,
} from "../services/esi/Characters.js";

async function getCharacter(req: Request, res: Response) {
  const characterInfo = await fetchCharacterDetail(req.characterId!);
  return res.json(characterInfo);
}

async function getCharacterAssets(req: Request, res: Response) {
  const characterAssets = await fetchCharacterAssets(req.characterId!);
  return res.json(characterAssets);
}

export { getCharacter, getCharacterAssets };
