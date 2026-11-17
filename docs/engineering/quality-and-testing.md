# Quality and testing

**Status:** Existing commands and a proposed quality strategy.

## Existing checks

The package scripts currently provide:

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

The repository includes Vitest, Testing Library, and Playwright dependencies.
At the time this guide was written, a focused unit test exists for event
filtering. The presence of a test runner or script does not mean all flows have
coverage.

## Test strategy

- **Unit:** Pure business rules, validation, state transitions, permission
  policy, money calculations, availability and idempotency helpers.
- **Component:** Accessible interaction and rendering states for forms,
  event details, booking summaries, and status feedback.
- **Integration:** Database constraints, auth/session policy, transactional
  booking creation, provider adapters, and webhook deduplication.
- **End-to-end:** Critical attendee and organizer flows using isolated test
  data and provider/database fakes where appropriate.
- **Manual/accessibility:** Keyboard, screen reader, responsive, and recovery
  scenarios that automation does not cover well.

## Release checks

For each change, run the smallest relevant tests first. Before a release, run
lint, the full unit suite, type checking (`npx tsc --noEmit`), production build,
and the critical end-to-end paths. Verify migrations against a disposable
database and review deployment compatibility.

Do not use production accounts or payment credentials in tests. Tests should
assert observable behavior and business invariants rather than internal
implementation details.

## Test data and reliability cases

For booking/payment work, include concurrent inventory requests, duplicate and
out-of-order webhooks, retry after timeout, expired reservations, refund
transitions, and authorization failures. Keep fixtures deterministic and avoid
sharing mutable test state across cases.

## CI status

No CI workflow was confirmed during the initial repository inspection. Add or
verify an automated pull-request pipeline for lint, type checking, tests, and
build before treating those commands as enforced release gates.
