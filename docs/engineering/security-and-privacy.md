# Security and privacy

**Status:** Current controls summarized from the repository documentation and
code; this is not a security audit or compliance statement.

## Current controls

- Better Auth provides persisted PostgreSQL sessions and account flows.
- The README documents verified email, 12–128 character passwords, and
  database-backed rate limiting for sign-in and recovery routes.
- Application roles are represented by a TypeScript union; the Prisma user
  role is stored server-side.
- Protected pages use server-side session and role checks. `admin` can satisfy
  role-protected access according to the current helper.
- Email verification and reset delivery are configured through environment
  variables; local development links are written to the server terminal.
- `.env.example` contains placeholders. Real secrets belong in ignored local
  environment files or a deployment secret manager.

## Requirements for future features

- Authenticate and authorize every server-side read and mutation. Check
  resource ownership, not only whether a user is signed in.
- Validate and normalize all untrusted input at the server boundary.
- Treat price, role, availability, and transaction state from the browser as
  untrusted.
- Verify payment webhooks cryptographically, enforce idempotency, and
  reconcile uncertain provider outcomes.
- Do not store raw card data. Minimize personal data in logs, analytics,
  notifications, and support tools.
- Use least-privilege database/provider credentials and separate dev, staging,
  and production secrets.
- Apply rate limits and abuse monitoring to authentication, booking,
  invitations, and other costly or sensitive operations.
- Protect administrative actions with explicit authorization and an
  appropriately retained audit trail.
- Define account deletion, data retention, export, and incident-response
  procedures before collecting production user data.

## Threat-model checklist

For each sensitive workflow, record:

1. Assets and actors (including unauthenticated users, attendees, organizers,
   admins, and provider callbacks).
2. Trust boundaries and input sources.
3. Abuse cases: privilege escalation, IDOR, brute force, event scraping,
   inventory races, webhook replay, forged status, and data leakage.
4. Preventive and detective controls.
5. Tests and logs/alerts that prove or detect the expected behavior.

Revisit the threat model when adding payments, ticket transfer/check-in,
administrative tools, file uploads, or new external providers.
