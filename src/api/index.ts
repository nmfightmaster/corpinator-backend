import { Router } from "express";
import health from "./routes/health.js";
import auth from "./routes/auth.js";
import esi from "./routes/esi.js"

export default () => {
  const app = Router();

  health(app);
  auth(app);
  esi(app);

  return app;
};
