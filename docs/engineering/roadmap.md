# Delivery roadmap

**Status:** Proposed sequencing; no release dates or commitments implied.

Work should ship in demonstrable slices. Each phase has an explicit gate so
future capabilities are not treated as complete merely because folders or UI
mockups exist.

## Phase 0 — Define the product

- Confirm launch users, geography, currency, fees, cancellation rules, and
  support responsibilities.
- Agree on measurable outcomes and non-functional requirements.
- Select payment/email providers and confirm their operational and compliance
  requirements.
- Review the proposed data lifecycle and security controls.

**Exit gate:** Product decisions that materially affect the domain model and
checkout are documented and approved.

## Phase 1 — Stabilize the preview foundation

- Keep discovery, account, and role-protected routes reliable.
- Establish shared design tokens and component accessibility conventions.
- Maintain type checking, linting, and unit-test coverage for business rules.
- Define deployment environments, secret handling, and database migration
  ownership.

**Current position:** Discovery and authentication are present; the broader
organizer and ticketing capabilities remain preview or scaffold work.

## Phase 2 — Persistent event and organizer workflows

- Define event lifecycle, venue ownership, ticket types, capacity, and
  publication rules.
- Implement server-authorized organizer event management and public event
  pages backed by persistent data.
- Add validation, audit-relevant changes, and integration tests.

**Exit gate:** An authorized organizer can create and publish a valid event,
and attendees see only publishable event data.

## Phase 3 — Booking and ticket lifecycle

- Implement availability-safe booking creation and a documented booking state
  machine.
- Integrate payment using provider-hosted or tokenized payment handling.
- Process verified, idempotent payment webhooks and issue tickets only after
  confirmed payment according to the agreed policy.
- Implement cancellation, refunds, and support-visible reconciliation.

**Exit gate:** Repeated requests, delayed webhooks, and payment failures cannot
create duplicate charges or oversell inventory; critical cases are observable
and recoverable.

## Phase 4 — Operate and improve

- Add organizer reporting and administration workflows based on validated
  requirements.
- Establish service dashboards, alerting, backup/restore drills, and support
  runbooks.
- Review production metrics and prioritize improvements from user feedback.

**Exit gate:** Production owners, SLOs, escalation paths, and recovery
procedures are explicit.

## Planning rules

- Break each phase into small vertical slices with acceptance criteria.
- Track dependencies and decisions in the issue tracker; this roadmap is not a
  task backlog.
- Reassess phase order when product decisions or provider capabilities change.
- Do not add a date until capacity, dependencies, and acceptance scope are
  understood.
