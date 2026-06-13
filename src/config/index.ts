import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  logs: {
    level: string;
  };
  api: {
    prefix: string;
  };
  databaseUrl: string;
  eve: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
  session: {
    eveSessionTtlMs: number;
    secret: string;
  };
  cors: {
    origin: string;
  };
  frontendUrl: string
}

const sessionSecret = process.env.SESSION_SECRET;
const databaseUrl = process.env.DATABASE_URL;
const clientId = process.env.EVE_CLIENT_ID;
const clientSecret = process.env.EVE_CLIENT_SECRET;
const redirectUri = process.env.EVE_REDIRECT_URI;
const origin = process.env.CORS_ORIGIN;

const requiredVars = [
  "SESSION_SECRET",
  "DATABASE_URL",
  "EVE_CLIENT_ID",
  "EVE_CLIENT_SECRET",
  "EVE_REDIRECT_URI",
  "CORS_ORIGIN",
];

for (const varName of requiredVars) {
  if (!process.env[varName]) throw new Error(`${varName} not set.`);
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "local",
  logs: {
    level: process.env.LOG_LEVEL || "warn",
  },
  api: {
    prefix: "/api",
  },
  databaseUrl: databaseUrl!,
  eve: {
    clientId: clientId!,
    clientSecret: clientSecret!,
    redirectUri: redirectUri!,
  },
  session: {
    eveSessionTtlMs: Number(process.env.EVE_SESSION_TTL_MS) || 86400000,
    secret: sessionSecret!,
  },
  cors: {
    origin: origin!,
  },
  frontendUrl: process.env.FRONTEND_URL || ""
};

export default config;
