# EventPass

EventPass is a feature-first event discovery and management platform starter.
The portfolio preview includes event discovery, category filters, event details,
organizer information, and secure account flows. Event listings are sample data;
publishing, bookings, and payments are not connected yet.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Authentication setup

1. Copy the values in `.env.example` into `.env.local`.
2. Set `DATABASE_URL` to your Neon PostgreSQL connection string. Use the
   direct (non-pooled) connection for Prisma migrations.
3. Generate an auth secret and set `BETTER_AUTH_SECRET`:

   ```bash
   node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"
   ```

4. Apply the tracked database migrations and generate Prisma Client:

   ```bash
   npm run db:migrate
   npm run db:generate
   ```

5. In development, verification and reset links are written to the dev server
   terminal. For production, configure `RESEND_API_KEY`, `AUTH_EMAIL_FROM` with
   a verified sender, and the canonical HTTPS `BETTER_AUTH_URL`.

Authentication uses Better Auth with persisted PostgreSQL sessions. It requires
verified email addresses, enforces 12–128 character passwords, rate-limits
sign-in and recovery routes in the database, and keeps account roles
server-controlled. Protected pages check the session and role on the server.

### Superadmin access

Create an account through the normal sign-up flow and verify its email. Then
grant the role from a trusted environment with database access:

```bash
SUPERADMIN_EMAIL="admin@example.com" npm run db:promote:superadmin
```

In production, also set `SUPERADMIN_BOOTSTRAP_CONFIRM=true` for that command.
The promotion refuses missing or unverified accounts; superadmin privileges
cannot be selected during public sign-up. Sign in normally to access
`/superadmin`.

Sessions are persisted by Better Auth in PostgreSQL. The browser receives the
session token only in an HttpOnly, SameSite=Lax cookie, marked Secure in
production; the application does not put auth tokens in localStorage or expose
them in the dashboard.

### Local demo organizer

After applying migrations, run:

```bash
npm run db:seed:demo
```

The local-only seed creates `demo@eventpass.local` with the organizer role and
prints a randomly generated password once. Set `DEMO_USER_PASSWORD` in
`.env.local` if you need a predictable local password. The seed refuses to run
in production. Do not publish a seeded demo password or reuse it for a real
account.

## Project structure

```text
src/
  app/                 Next.js routes and route-level metadata
  features/
    auth/              Account UI, sessions, and access policies
    events/            Event types, sample data, discovery, and filtering
    organizers/        Organizer-facing experience
    bookings/          Booking feature boundary
    payments/          Payment feature boundary
    tickets/           Ticket feature boundary
  modules/             Backend/domain module boundaries
  shared/
    components/
      homepage/        Shared site shell and landing-page sections
      ui/              Shared UI primitives
prisma/
  migrations/          Versioned schema changes
```

Feature-specific UI and logic live with their feature. Cross-feature interface
components live under `src/shared`. Routes in `src/app` compose those pieces.

## Checks

```bash
npm test
npm run lint
npm run build
```

Keep real credentials in ignored local environment files or a deployment
secret manager; never commit them.
