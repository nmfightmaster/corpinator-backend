import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import { getCharacter } from "../../controllers/esiController.js";

const router = Router();

export default (app: Router) => {
  app.use("/esi", auth, router);

  router.get("/characters/me", getCharacter);
};
