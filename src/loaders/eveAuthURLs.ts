import logger from "./logger.js";
import { SsoException } from "../exceptions/SsoException.js";
import * as jose from "jose";

export let authorizationEndpoint = "";
export let tokenEndpoint = "";
let jwksUri = "";
export let revokeEndpoint = "";
export let jwks: ReturnType<typeof jose.createRemoteJWKSet>;

export async function loadEveAuthURLs() {
  try {
    const response = await fetch(
      "https://login.eveonline.com/.well-known/oauth-authorization-server",
    );
    if (!response.ok) {
      throw new SsoException(
        response.status,
        `Failed to fetch EVE Online auth URLs: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    authorizationEndpoint = data.authorization_endpoint;
    tokenEndpoint = data.token_endpoint;
    jwksUri = data.jwks_uri;
    revokeEndpoint = data.revocation_endpoint;
    jwks = jose.createRemoteJWKSet(new URL(jwksUri));
  } catch (error) {
    logger.error(`Error loading EVE Online auth URLs: ${error}`);
    throw error;
  }
}
