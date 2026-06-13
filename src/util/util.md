# util/

The `util/` folder is for generic, reusable helper functions that have no business logic and no knowledge of the application's domain. A utility function should be so generic that you could copy it into a completely different project and it would still make sense.

If a helper function refers to EVE, SSO, characters, or any other domain concept, it is not a utility — it belongs in a service.

---

## What belongs in util/

Utilities tend to be small, pure functions that solve a general programming problem. For a TypeScript/Node backend, common examples include:

- **Date and time helpers** — formatting timestamps, computing durations, checking whether a date has passed
- **String helpers** — sanitization, truncation, case conversion
- **Type guards** — functions that narrow TypeScript types (e.g. checking whether an unknown value is a specific shape)
- **Async helpers** — a sleep/delay function, a retry wrapper with backoff, a timeout wrapper
- **Parsing helpers** — safely parsing JSON without throwing, extracting a value from a deeply nested object
- **Logging wrapper** — a thin wrapper around your logger that standardizes log format, if it doesn't warrant its own package

## The key question for util/

Ask: "Could I paste this function into a weather app, a note-taking app, or a completely unrelated project and have it still work?" If yes, it belongs in `util/`. If it would need to be adapted for domain reasons, it belongs in a service or config.

## What does not belong in util/

- Functions that call the database
- Functions that call EVE's APIs
- Functions that make decisions based on application state
- Functions that import from `services/`, `models/`, or `config/` — if a util file needs those, it has become a service in disguise
