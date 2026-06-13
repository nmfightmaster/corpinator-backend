import express from "express";
import expressLoader from "./express.js";
import logger from "./logger.js";
import { loadEveAuthURLs } from "./eveAuthURLs.js";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  logger.info("Loading EVE Online auth URLs.");
  await loadEveAuthURLs();
  logger.info("EVE Online auth URLs loaded.");

  // Load me last!
  logger.info("Loading Express.");
  expressLoader({ app: expressApp });
  logger.info("Express loaded.");
};

export { default as logger } from "./logger.js";
