# api/

The `api/` folder is the HTTP boundary of your application. Code here is the first thing that touches an incoming request and the last thing that shapes an outgoing response. Nothing in this folder should contain business logic or interact with the database directly.

A useful test: if you could describe what a file does without mentioning Express, it probably doesn't belong here.

---

## routes/

Route files map a URL path and HTTP method to a controller function. Their only job is to say "when someone hits this endpoint, call this handler." They also declare which middleware runs before the handler.

Each route file should correspond to a logical resource or feature area. For an EVE app this might look like one file for authentication routes, one for character-related routes, one for market data routes, and so on.

Routes should not contain logic — they are a table of contents, not a chapter.

## middleware/

Middleware files run between the request arriving and the controller being called (or after the controller, for error handling). Each middleware file should do exactly one thing.

Common middleware in an EVE app might include:

- **JWT verification** — reads the Authorization header, validates the token, and attaches the decoded user identity to the request so downstream handlers can access it
- **Scope guard** — checks that the authenticated user's token includes the EVE SSO scopes required for a given endpoint
- **Rate limiting** — prevents a single client from hammering the EVE ESI API through your backend
- **Error handler** — a special Express error-handling middleware (four arguments) that catches any error thrown by a controller, maps it to the right HTTP status code, and formats the response body consistently

Middleware should never reach into the database or call external APIs directly. If it needs to validate a token cryptographically, it can call a service to do that.
