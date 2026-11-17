# Operations and delivery

**Status:** Local setup is documented; production hosting and operational
ownership still need decisions.

## Local development

The root README is the source of truth for installation and authentication
setup. In brief:

1. Install dependencies with `npm install`.
2. Configure `.env.local` from `.env.example`; use non-production credentials.
3. Start local dependencies with the repository's Docker Compose configuration
   when needed.
4. Apply migrations and generate Prisma Client using the documented package
   scripts.
5. Run `npm run dev`.

The Compose file defines PostgreSQL and Redis for local development. Confirm
whether Redis has an application use before operating or deploying it as a
required service.

## Environments and secrets

Use separate development, staging, and production databases and credentials.
Keep secrets out of source control, browser bundles, logs, screenshots, and
documentation. The current environment example names the database URL,
Better Auth URL/secret, and optional production email provider settings.
Configure production email with a verified sender and canonical HTTPS URL.

## Database release process

- Review schema and migration diffs before merge.
- Back up production data and verify restore procedures before risky changes.
- Prefer expand/contract migrations when old and new application versions may
  overlap.
- Deploy compatible schema changes before code that requires them.
- Monitor migration duration and application errors after rollout.
- Define a recovery or forward-fix plan; do not assume every migration can be
  rolled back safely.

## Observability and support

Before production, define:

- Error reporting and structured log retention.
- Health checks and service dashboards.
- Alerts for authentication failures, database exhaustion, payment/webhook
  failures, email delivery, and unusual booking changes.
- A support runbook for booking lookup, payment reconciliation, refunds, and
  account recovery.
- Incident severity, on-call ownership, communication, and escalation paths.

Avoid logging credentials, session tokens, raw payment data, or unnecessary
personal information.

## Deployment decisions needed

- Hosting/runtime and region.
- Staging and production topology, including whether Redis or background
  workers are actually required.
- CI/CD workflow, approvals, and rollback/forward-fix policy.
- Backup frequency, retention, restore testing, and recovery objectives.
- Service-level objectives, monitoring ownership, and support coverage.
