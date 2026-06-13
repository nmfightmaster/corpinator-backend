# config/

The `config/` folder holds everything that describes your app's intent and environment — things that are true about the application before it does anything. Config is not logic; it is declaration.

Nothing in `config/` should be doing meaningful computation at runtime. If a file here is making decisions, it has probably crossed the line into service territory.

---

## What belongs in config/

- **Environment variable loading and validation** — a single file that reads from `.env`, validates that required values are present, and exports them as typed constants. The rest of the application imports from here rather than calling `process.env` directly. This means if a variable is missing, the app fails loudly at startup rather than silently at runtime.
- **scopes.json** — your list of EVE SSO permission scopes that the app requests on behalf of the user. This is a declaration of intent, not logic.
- **scopes.ts** (or equivalent) — the file that imports `scopes.json` and exports it in whatever typed shape the rest of the app expects. This is a thin processor, not a service. It should not make decisions about scopes; it just makes the JSON usable in a type-safe way.
- **Database configuration** — connection parameters, pool settings, and similar. The actual connection setup happens in `loaders/`, but the configuration values originate here.
- **App-wide constants** — things like the EVE SSO authorization URL, the ESI base URL, token expiry thresholds, or other fixed values that you might need to adjust between environments.

## What does not belong in config/

- Logic that decides which scopes to request based on the user or request context (that's a service concern)
- Anything that makes network calls
- Anything that imports from `services/`, `models/`, or `controllers/`

## A note on secrets

Client IDs, client secrets, and similar credentials should always come from environment variables, never be hardcoded in config files, and never be committed to version control. The config file loads and exposes them; it does not define their values.
