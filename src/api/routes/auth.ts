import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, callback, logout } from "../../controllers/authController.js";
import config from "../../config/index.js";

const authRateLimit = rateLimit({
  windowMs: config.rateLimit.authWindowMs,
  limit: config.rateLimit.authLimit,
});

const router = Router();

export default (app: Router) => {
  app.use("/auth", authRateLimit, router);

  router.get("/login", login);
  router.get("/callback", callback);
  router.delete("/logout", logout);
};
