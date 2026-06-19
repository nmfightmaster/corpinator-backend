import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getCharacter,
  getCharacterAssets,
} from "../../controllers/esiCharactersController.js";

const router = Router();

export default (app: Router) => {
  app.use("/esi/characters", auth, router);

  router.get("/me", getCharacter);
  router.get("/assets", getCharacterAssets);
};
