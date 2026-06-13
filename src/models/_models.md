# models/

Models define the shape of your data as it exists in the database. A model file is a schema definition and nothing else. Business logic does not belong here — if you find yourself writing conditional logic inside a model, it should almost certainly move to a service.

---

## What a model file represents

Each model corresponds to a database entity. For an EVE app this might include:

- **User** — represents an authenticated EVE character. Likely stores the EVE character ID (which serves as the unique identifier), the character name, the stored refresh token (so the app can re-authenticate on the user's behalf without them logging in again), and timestamps.
- **WatchlistEntry** or similar — if your app lets users track items, contracts, or market orders, a model for that persisted data lives here.

## What model files are responsible for

- Defining the fields, types, and constraints of a database table or document
- Declaring indexes
- Defining associations or relationships between entities (e.g. a user has many watchlist entries)
- Static query helpers if your ORM supports them — but only simple ones that are purely about data retrieval, not about business decisions

## What model files are not responsible for

- Any logic about what to do with data after it's retrieved
- Making calls to external APIs
- Knowing anything about HTTP or the request lifecycle
- Enforcing business rules — those belong in services

## A note on refresh tokens

Your User model will almost certainly store the EVE SSO refresh token. This is sensitive. Consider encrypting it at the model/database layer rather than relying solely on application-level handling.
