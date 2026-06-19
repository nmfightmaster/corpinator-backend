import { Router } from "express";
import health from "./routes/health.js";
import auth from "./routes/auth.js";
import esiCharacters from "./routes/esiCharacters.js";

export default () => {
  const app = Router();

  health(app);
  auth(app);
  esiCharacters(app);

  return app;
};
