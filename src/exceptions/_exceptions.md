# exceptions/

The `exceptions/` folder contains custom error classes for your application. Typed exceptions are what allow your services to communicate failure in a meaningful way without knowing anything about HTTP. A service throws a domain error; middleware or a controller catches it and decides what HTTP response that maps to.

Without typed exceptions, errors tend to either be swallowed, returned as magic values (`null`, `false`, an error string), or thrown as generic `Error` objects that tell you nothing about what went wrong.

---

## What an exception file represents

Each exception class should represent a distinct failure condition that your application needs to handle differently from a generic crash. For an EVE app this might include:

- **SSOError** — thrown by SSOService when EVE's authorization server rejects a token exchange or returns an unexpected response. Useful for distinguishing an auth failure from a network failure.
- **TokenExpiredError** — thrown when a token has expired and the refresh attempt also failed (e.g. the user revoked access in EVE's account settings). This should trigger a re-login flow rather than a generic 500.
- **InsufficientScopesError** — thrown when the authenticated user's token does not cover a scope required for the requested operation. Maps to a 403.
- **ESIError** — thrown when EVE's ESI API returns an error response. May carry the ESI error code for logging or surfacing to the client.
- **NotFoundError** — a general-purpose exception for when a requested resource does not exist. Maps to a 404.

## How exceptions work with the rest of the app

Services throw exceptions. Controllers may catch specific ones if they need to handle them in a nuanced way. The global error-handling middleware in `api/middleware/` catches anything that wasn't handled upstream, inspects the exception type, and maps it to the appropriate HTTP status code and response body.

This separation means your services stay clean — they express what went wrong in domain terms — and your HTTP layer stays clean — it handles the translation to status codes in one place.

## What exception files should not contain

- Logic about what HTTP status to use (that belongs in the error middleware)
- Calls to services, models, or config
- Anything other than the class definition, its properties, and its constructor
