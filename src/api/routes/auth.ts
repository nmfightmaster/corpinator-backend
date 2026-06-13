import { Router } from "express";
import { login, callback } from "../../controllers/authController.js";

const router = Router();

export default (app: Router) => {
  app.use("/auth", router);

  router.get("/login", login);
  router.get("/callback", callback);
};
