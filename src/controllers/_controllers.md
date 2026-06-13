# controllers/

Controllers are the orchestrators. They receive a request from the router, extract whatever they need from it (body, query params, route params, the authenticated user), hand off to one or more services, and then shape the HTTP response.

A controller is allowed to know about `req` and `res`. It is not allowed to contain business logic or data access. If a controller method is getting long, that is usually a sign that logic has leaked in that belongs in a service.

---

## What a controller file represents

Each controller file typically corresponds to a resource or feature area, mirroring the structure of your routes. For an EVE app this might mean:

- **AuthController** — handles the SSO callback endpoint; reads the authorization code from the query string, passes it to the SSO service, and returns the resulting tokens or session to the client
- **CharacterController** — handles requests for character data; calls the relevant service and returns the formatted response
- **MarketController** — handles requests for market data endpoints

## What controllers are responsible for

- Reading inputs from the request (params, body, headers, the authenticated user attached by middleware)
- Calling services to perform the actual work
- Deciding the HTTP status code and response shape
- Handling the case where a service throws a known error and translating that into a meaningful HTTP response, if the global error middleware isn't sufficient

## What controllers are not responsible for

- Talking to the database
- Making HTTP calls to EVE's ESI API
- Containing conditional logic about business rules
- Knowing anything about how tokens are validated or how scopes are checked — that belongs in middleware or services
