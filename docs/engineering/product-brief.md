# Product brief

**Status:** Baseline for planning; validate with stakeholders before committing
to a production scope.

## Product intent

EventPass aims to help people discover local events and help organizers manage
those events and their attendees in one place. The repository currently
implements a portfolio preview: event discovery uses sample data, account
flows are connected to authentication, and organizer-facing areas are early
previews.

## Users and needs

| User | Need |
| --- | --- |
| Attendee | Find relevant events, understand the details, and eventually book and manage tickets |
| Organizer | Create and manage events, understand sales, and manage attendees |
| Administrator | Maintain platform quality, review operational issues, and support users |

These are working personas, not confirmed research findings.

## Product outcomes

Before feature work begins, agree on measurable outcomes such as:

- Attendees can discover an event and complete a clear, trustworthy booking.
- Organizers can publish accurate event information and manage capacity.
- The platform can reconcile payment outcomes with booking and ticket state.
- Support and administration can identify and resolve common booking issues.

**Decision needed:** Select a launch audience, geography, supported currencies,
event categories, and the first measurable success metrics.

## Current scope

**Current**

- Next.js application with event discovery, categories, event detail pages, and
  sample event data.
- Sign-up, sign-in, email verification, password recovery, persisted sessions,
  and server-side role checks.
- An organizer overview and dashboard preview.
- Feature directories for bookings, payments, and tickets that do not yet
  contain working implementations.

**Not currently delivered**

- Event publishing backed by persistent event records.
- Reservation, checkout, payment processing, ticket issuance, or refunds.
- A production-ready organizer or administration workflow.

## Product principles

1. Make event facts, price, availability, and booking state explicit.
2. Never claim a ticket or payment succeeded based only on browser state.
3. Keep user-facing flows accessible, responsive, and understandable.
4. Minimize personal data and collect it only for a defined purpose.
5. Prefer a complete, supportable vertical slice over disconnected feature
   scaffolding.

## Open product decisions

- Which organizer types and attendee markets are in the first release?
- What event capacity, ticket types, fees, taxes, and cancellation rules apply?
- Which payment provider, currencies, and refund policies are required?
- What admin actions are needed, and which actions require an audit trail?
- What accessibility and localization targets apply at launch?

Resolve these decisions before finalizing booking, payment, and data-retention
designs.
