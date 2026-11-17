# Data model

**Status:** The current schema is real; the domain model below is a design
checklist, not a migration proposal.

## Current persistence

The Prisma schema currently contains:

- `User`, with email verification, role, timestamps, accounts, and sessions.
- `Session`, related to a user and indexed by `userId`.
- `Account`, related to a user and uniquely identified by issuer/account ID.
- `Verification`, indexed by identifier.
- `RateLimit`, with a unique key and request counters.

The configured database is PostgreSQL. Authentication data is persistent;
event discovery still reads sample data from the codebase. Do not treat
dashboard preview metrics or sample events as authoritative business records.

## Domain entities to design

Before adding migrations, define ownership, state transitions, retention, and
constraints for the entities needed by the agreed product:

- **Event:** organizer, publication state, time zone, schedule, venue, and
  cancellation metadata.
- **Venue:** address/location privacy, capacity, and organizer/platform
  ownership.
- **Ticket type:** event, price/currency, sale window, and inventory policy.
- **Booking:** attendee, event, amount snapshot, quantity, status, and
  idempotency/reconciliation references.
- **Payment attempt:** provider identifiers, amount/currency, status, and
  verified webhook references; never store raw card credentials.
- **Ticket:** booking association, unique public identifier, lifecycle, and
  check-in state.
- **Audit event:** actor, action, target, timestamp, and minimized change
  context for sensitive administrative actions.

These are conceptual boundaries. Some may be represented differently after
provider and workflow decisions.

## Data-modeling rules

- Use foreign keys, uniqueness constraints, and indexes to enforce domain
  invariants, not only application checks.
- Store monetary amounts in integer minor units with an explicit ISO currency
  code; never use floating point for money.
- Persist instants in UTC and retain the event's IANA time-zone identifier for
  local display and recurrence rules.
- Snapshot the agreed price and relevant terms on a booking so later event
  edits do not rewrite transaction history.
- Document nullable fields, delete behavior, retention, and ownership before
  introducing them.
- Keep database migrations reviewed, versioned, and backward-compatible with
  the deploy sequence where practical.
- Avoid placing provider secrets, session tokens, or unnecessary PII in
  analytics and audit payloads.

## Decisions required before booking migrations

- Inventory reservation strategy, expiration, and oversell policy.
- Booking and payment state machines, including cancellation/refund/chargeback.
- Currency, tax, platform fee, and rounding policy.
- Event/venue ownership and deletion/archival rules.
- Retention and deletion requirements for account and transaction records.
- Whether audit data requires immutability or separate storage.
