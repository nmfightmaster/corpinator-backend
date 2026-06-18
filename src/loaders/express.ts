import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../api/index.js";
import config from "../config/index.js";
import logger from "../loaders/logger.js";
import rateLimit from "express-rate-limit";

import { AppException } from "../exceptions/AppException.js";
import { HttpException } from "../exceptions/HttpException.js";

const standardRateLimit = rateLimit({windowMs: config.rateLimit.standardWindowMs, limit: config.rateLimit.standardLimit})

export default ({ app }: { app: express.Application }) => {
  app.use(helmet());
  app.use(cors({ origin: config.cors.origins }));
  app.use(express.json());
  app.use(cookieParser(config.session.secret));
  app.set("trust proxy", config.trustProxy);
  app.use(config.api.prefix, standardRateLimit);
  app.use(config.api.prefix, routes());
  app.use((req, res, next) => {
    const err = new HttpException(404, "Not Found");
    next(err);
  });
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (err instanceof AppException) {
        if (err.retryAfter) {
          res.setHeader("Retry-After", String(err.retryAfter));
        }
        if (err.status >= 500) {
          logger.error(`${err.name}: ${err.message}`)
        } else if (err.status >= 400) {
          logger.warn(`${err.name}: ${err.message}`)
        }        
        res.status(err.status).json({ message: err.message });
      } else {
        logger.error("Unexpected error", err);
        res.status(500).json({ message: "Internal Server Error" });
      }
    },
  );
};
