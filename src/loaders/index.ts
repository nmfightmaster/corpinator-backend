import express from "express";
import expressLoader from "./express.js";
import logger from "./logger.js";
import { loadEveAuthURLs } from "./eveAuthURLs.js";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  logger.info("Loading Express.");
  await expressLoader({ app: expressApp });
  logger.info("Express loaded.");

  logger.info("Loading EVE Online auth URLs.");
  await loadEveAuthURLs();
  logger.info("EVE Online auth URLs loaded.");
};

export { default as logger } from "./logger.js";
