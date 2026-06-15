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
    baseUrl: string;
    compatibilityDate: string;
  };
  session: {
    eveSessionTtlMs: number;
    secret: string;
  };
  cors: {
    origins: string[];
  };
  frontendUrl: string;
  crypto: {
    encryptionKey: string;
  };
  secureCookies: boolean;
}

const requiredVars = [
  "SESSION_SECRET",
  "DATABASE_URL",
  "EVE_CLIENT_ID",
  "EVE_CLIENT_SECRET",
  "EVE_REDIRECT_URI",
  "CORS_ALLOWED_ORIGINS",
  "ENCRYPTION_KEY",
  "EVE_BASE_URL",
  "EVE_COMPATIBILITY_DATE",
  "SECURE_COOKIES",
  "FRONTEND_URL",
];

for (const varName of requiredVars) {
  if (!process.env[varName]) throw new Error(`${varName} not set.`);
}

const origins = (process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim());

const secureCookiesString = process.env.SECURE_COOKIES!.toLowerCase();
const falsyValues = ["no", "false", "0"];
const secureCookies = !falsyValues.includes(secureCookiesString)

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "local",
  logs: {
    level: process.env.LOG_LEVEL || "warn",
  },
  api: {
    prefix: "/api",
  },
  databaseUrl: process.env.DATABASE_URL!,
  eve: {
    clientId: process.env.EVE_CLIENT_ID!,
    clientSecret: process.env.EVE_CLIENT_SECRET!,
    redirectUri: process.env.EVE_REDIRECT_URI!,
    baseUrl: process.env.EVE_BASE_URL!,
    compatibilityDate: process.env.EVE_COMPATIBILITY_DATE!,
  },
  session: {
    eveSessionTtlMs: Number(process.env.EVE_SESSION_TTL_MS) || 86400000,
    secret: process.env.SESSION_SECRET!,
  },
  cors: {
    origins,
  },
  frontendUrl: process.env.FRONTEND_URL!,
  crypto: {
    encryptionKey: process.env.ENCRYPTION_KEY!,
  },
  secureCookies: secureCookies,
};

export default config;
