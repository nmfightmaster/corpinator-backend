# services/

Services are the heart of the application. This is where all business logic lives. A service has no knowledge of HTTP — it does not touch `req`, `res`, or any Express concept. It takes plain inputs and returns plain outputs (or throws a typed exception).

The practical test: you should be able to call any service function from a unit test, a CLI script, or a cron job without any HTTP context. If you can't, something has leaked in that shouldn't be there.

---

## What a service file represents

Each service file should represent a coherent area of capability. For an EVE Online app this might include:

- **SSOService** — everything related to EVE's SSO JWT flow: exchanging an authorization code for tokens, validating and decoding a JWT, refreshing an expired access token using a stored refresh token, and revoking tokens on logout. This service is the single source of truth for all authentication mechanics.
- **EVEApiService** (or per-domain variants) — wraps calls to EVE's ESI API. Handles constructing requests, attaching the appropriate access token, and parsing responses. May also handle ESI-specific concerns like respecting cache headers or dealing with rate limit responses.
- **CharacterService** — business logic around character data; fetches from ESI via EVEApiService, applies any app-specific transformations or filtering, and returns what the controller needs.
- **ScopeService** — if your scope list has logic around it (checking whether a user's token covers a required scope, computing missing scopes, etc.), that logic lives here rather than in middleware or controllers.

## What services are responsible for

- All business rules and decision-making
- Calling models to read from or write to the database
- Calling other services when needed (e.g. CharacterService calling EVEApiService)
- Throwing typed exceptions from `exceptions/` when something goes wrong in a domain-meaningful way

## What services are not responsible for

- Knowing what HTTP status code corresponds to an error (that's the controller or error middleware)
- Accessing `req` or `res` in any form
- Formatting response payloads for the client
