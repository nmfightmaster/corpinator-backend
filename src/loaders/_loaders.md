# loaders/

Loaders handle the bootstrap sequence — the things that need to happen once, in the right order, before the app is ready to serve requests. Separating this from your entry point (`index.ts` or `server.ts`) keeps startup logic organized and makes it easy to control initialization order.

---

## What a loader file represents

Each loader is responsible for one initialization concern. Common loaders include:

- **Express loader** — mounts global middleware (body parsing, CORS, security headers), registers the router, and mounts the error-handling middleware last
- **Database loader** — establishes the database connection, runs any pending migrations if applicable, and confirms connectivity before the app starts accepting traffic
- **Dependency injection loader** — if you use a DI container, this is where services are registered and wired together

## How loaders are used

A root loader file (often just called `index.ts` inside `loaders/`) imports all individual loaders and calls them in the correct sequence. The app entry point calls only this root loader, keeping `server.ts` clean.

The ordering matters: your database loader should complete before your Express loader registers routes that depend on the database being available.

## What loaders are not responsible for

- Business logic of any kind
- Defining routes (that belongs in `api/routes/`)
- Defining schemas (that belongs in `models/`)
- Containing configuration values (those come from `config/`)

Loaders are purely procedural setup code. If a loader file is growing long or complex, that is usually a sign that initialization concerns have been mixed together and should be split into separate loaders.
