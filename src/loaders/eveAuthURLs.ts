import logger from "./logger.js";

export let authorizationEndpoint = "";
export let tokenEndpoint = "";
export let jwksUri = "";
export let revokeEndpoint = "";

export async function loadEveAuthURLs() {
  try {
    const response = await fetch(
      "https://login.eveonline.com/.well-known/oauth-authorization-server",
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch EVE Online auth URLs: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    authorizationEndpoint = data.authorization_endpoint;
    tokenEndpoint = data.token_endpoint;
    jwksUri = data.jwks_uri;
    revokeEndpoint = data.revocation_endpoint;
    logger.info("Successfully loaded EVE Online auth URLs");
  } catch (error) {
    logger.error(`Error loading EVE Online auth URLs: ${error}`);
    throw error; // Rethrow the error to be handled by the caller
  }
}
