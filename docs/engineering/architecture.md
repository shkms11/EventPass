# Architecture

**Status:** Current repository map plus proposed boundary rules.

## Current system

EventPass is a Next.js App Router application using React and TypeScript.
Route-level composition lives in `src/app`; feature UI and logic are grouped
under `src/features`; reusable presentation components live under
`src/shared`. Authentication uses Better Auth, Prisma, and PostgreSQL. Event
discovery currently uses local sample data.

```text
Browser
  └─ Next.js App Router (src/app)
       ├─ Route pages compose feature/shared UI
       ├─ Server-side session and role checks (src/features/auth)
       ├─ Better Auth handler (src/app/api/auth/[...all])
       └─ Prisma ── PostgreSQL / Neon

Local development also defines PostgreSQL and Redis services in
docker-compose.yml. Redis is not documented here as a production dependency;
confirm its intended use before introducing one.
```

## Repository map

| Path | Responsibility | Current status |
| --- | --- | --- |
| `src/app` | Routes, page composition, metadata, auth route handler | Active |
| `src/features/auth` | Auth UI, session access, role policy | Active |
| `src/features/events` | Event view, filters, sample data | Active; data is not persistent |
| `src/features/organizers` | Organizer-facing UI | Early preview |
| `src/features/admin` | Admin dashboard UI and sample metrics | Preview/sample data |
| `src/features/bookings`, `payments`, `tickets` | Feature boundaries | Scaffold only |
| `src/modules` | Intended backend/domain module boundaries | Mostly placeholders |
| `src/shared` | Cross-feature UI, currently homepage and shared primitives | Active |
| `src/lib` | Shared integrations such as auth and Prisma clients | Active |
| `prisma` | PostgreSQL schema and versioned migrations | Auth-focused schema |

## Dependency direction

Use the following direction as the project grows:

1. Routes compose features and shared UI; they should not become domain-service
   implementations.
2. Feature UI depends on feature types and application-facing functions.
3. Domain/application logic owns business rules and should not depend on React
   components.
4. Repositories and provider adapters own persistence and external I/O.
5. Shared UI contains presentation primitives, not feature-specific business
   policy.

Avoid circular imports and avoid making `src/shared` a dumping ground for code
used by only one feature. Keep data transfer types separate from persistence
models when their lifecycles or consumers differ.

## Request and data flow

**Current auth-protected page:** A server route calls the session/role guard,
which reads the request headers, asks Better Auth for the current session, and
redirects unauthenticated or unauthorized users. Role assignment remains
server-controlled.

**Current event discovery:** Route and feature components render sample event
data and apply client-visible filters; this is not yet a persistent catalog.

**Future domain flow:** Route or server action → input validation → authorized
application use case → repository/provider adapter → database or external
provider. Return a minimal, typed result; do not expose secrets or persistence
internals to the browser.

## Implementation conventions

- Follow the installed Next.js documentation and current App Router patterns.
- Keep server-only code explicitly server-side and never import it into client
  components.
- Use the smallest necessary client boundary; rendering static UI does not
  require a client component.
- Keep feature data, types, UI, and business logic in clear feature-owned
  locations.
- Put shared presentation components under `src/shared`; promote components
  only when more than one feature genuinely uses them.
- Validate external input at the boundary and enforce authorization in trusted
  server code.
- Record consequential architecture changes as ADRs using
  [the template](./adr/0000-template.md).

## Architecture decisions to resolve

- Whether the `src/modules` layer will become the canonical application/domain
  layer or remain a future organization target.
- How server mutations will be implemented and how route handlers/server
  actions are divided.
- Whether Redis is needed, and for which concrete workloads.
- Production hosting, background job execution, observability, and deployment
  topology.
