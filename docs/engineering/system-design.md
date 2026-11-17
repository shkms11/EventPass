# System design

**Status:** Proposed target design. Booking and payment workflows described
here are not implemented.

## Design goals

- Correctly enforce event visibility, organizer ownership, and ticket
  availability.
- Preserve a traceable relationship between a booking, payment-provider
  events, and issued tickets.
- Tolerate retries, duplicate webhook delivery, delayed provider responses,
  and temporary downstream failures.
- Keep personal and payment data exposure to the minimum required for the
  agreed product.
- Begin with the existing application and PostgreSQL stack; add infrastructure
  only for a demonstrated need.

## Logical components

```text
Web client
  └─ Next.js route / server mutation
       ├─ Authentication and authorization
       ├─ Validation and application use case
       ├─ PostgreSQL repository
       └─ External provider adapter
            ├─ Email delivery
            └─ Payment provider (future)

Payment provider
  └─ Signed webhook → verification → idempotent event handling
       └─ booking/payment state update → ticket issuance
```

The diagram is a target boundary, not a claim that these modules or flows
already exist. Avoid introducing a message broker, cache, or distributed
service until measured load or reliability requirements justify it.

## Booking workflow sketch

The final workflow depends on provider capabilities and product rules. A
reasonable baseline to validate is:

1. Validate the requested event, ticket type, quantity, and customer input.
2. In a database transaction, verify capacity and create a pending booking
   with an expiry or reservation policy.
3. Create or initialize provider checkout using a stable idempotency key.
4. Treat the provider's verified server-to-server notification as the
   authoritative payment outcome; the browser return page is informational.
5. Apply each provider event once, transition the booking, and issue tickets
   only when the agreed paid/comped policy is satisfied.
6. Release expired inventory and reconcile records that remain pending beyond
   the expected window.

**Decision needed:** Choose whether inventory is held during checkout and for
how long. Specify behavior for partial refunds, chargebacks, cancellation,
provider outages, and ticket transfer before implementation.

## Invariants to protect

- A booking quantity cannot exceed the available inventory under concurrency.
- A provider event or retry cannot create a duplicate payment transition or
  duplicate ticket issuance.
- A user can access only their own attendee booking data; an organizer can
  access only events they are authorized to manage.
- Client-supplied price, role, payment status, and ticket status are never
  authoritative.
- Every state transition is valid for the documented state machine.
- Secrets and raw payment credentials are not returned to the browser or
  stored unless a reviewed requirement demands it.

## Reliability and scale approach

- Use database transactions and constraints for invariants that must hold
  across concurrent requests.
- Use provider idempotency keys and a unique processed-event key for webhook
  deduplication.
- Keep webhook handlers fast; persist verified events before any slow,
  retryable follow-up work.
- Add a job queue only when a real asynchronous workload needs durable retries.
- Define rate limits per sensitive operation and monitor rejection/error
  rates.
- Set explicit latency, availability, retention, recovery-point, and
  recovery-time targets before launch; values are currently undecided.

## Failure scenarios to design and test

| Scenario | Required behavior |
| --- | --- |
| Client retries checkout | Return or reuse the same logical booking/payment attempt |
| Provider request times out | Do not assume failure or success; reconcile using provider state |
| Webhook is duplicated or reordered | Deduplicate and validate allowed state transitions |
| Database transaction conflicts | Retry safely or return a clear retryable error |
| Email provider is unavailable | Preserve committed domain state; retry notification separately |
| Deployment interrupts a migration | Follow a documented recovery/forward-fix procedure |

## Observability

Use structured logs with correlation identifiers for booking and provider
events, but do not log passwords, tokens, full payment data, or unnecessary
personal data. Future dashboards should include booking conversion, payment
success/failure, webhook lag, inventory conflicts, email delivery outcomes,
and application errors.
