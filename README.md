# EventPass

EventPass is a feature-first event discovery and management platform starter.
The current portfolio preview includes event discovery, category filters,
event detail pages, and an organizer overview. Demo event data is local and
ticket checkout, accounts, and event publishing are not connected yet.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
src/
  app/                 Next.js routes and route-level metadata
  features/
    events/            Event types, demo data, discovery, and filtering
    organizers/        Organizer-facing experience
    auth/              Authentication feature boundary
    bookings/          Booking feature boundary
    payments/          Payment feature boundary
    tickets/           Ticket feature boundary
  modules/             Backend/domain module boundaries
  shared/
    components/
      homepage/        Shared site shell and landing-page sections
      ui/              Shared UI primitives
```

Feature-specific UI and logic live with their feature. Cross-feature interface
components live under `src/shared`. Routes in `src/app` compose those pieces.

## Checks

```bash
npm test
npm run lint
npm run build
```

## Database setup

The Prisma/PostgreSQL foundation is configured but the event catalog currently
uses demo data. Copy `.env.example` to `.env.local` and set `DATABASE_URL` when
you start adding persisted data or run Prisma commands. Keep real credentials
out of source control.
