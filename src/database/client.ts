import { Prisma, PrismaClient } from "../generated/prisma/client.js";
import config from "../config/index.js";

let prismaClientOptions: Prisma.PrismaClientOptions = {};

if (config.nodeEnv === "development" || config.nodeEnv === "local") {
  prismaClientOptions = {
    log: ["query", "info", "warn", "error"],
  };
} else {
  prismaClientOptions = {
    log: ["warn", "error"],
  };
}

const prismaClient = new PrismaClient(prismaClientOptions);

export default prismaClient;
