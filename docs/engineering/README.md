# EventPass engineering handbook

This folder is the home for product and engineering decisions that should be
understood before expanding the EventPass preview into a production event
platform. It documents both the current repository and the proposed direction;
planned capabilities are called out explicitly so they are not mistaken for
working features.

## Start here

| Document | What it covers |
| --- | --- |
| [Product brief](./product-brief.md) | Vision, users, scope, and product decisions still needed |
| [Roadmap](./roadmap.md) | Delivery phases and readiness gates |
| [Architecture](./architecture.md) | Current code organization, boundaries, and conventions |
| [System design](./system-design.md) | Target workflows, service shape, and quality attributes |
| [Data model](./data-model.md) | Current database schema and proposed domain entities |
| [Design language](./design-language.md) | Existing visual language and UI implementation guidance |
| [Security and privacy](./security-and-privacy.md) | Current controls and requirements for future features |
| [Quality and testing](./quality-and-testing.md) | Existing checks and the test strategy |
| [Operations](./operations.md) | Local setup, release, migrations, and operational readiness |
| [ADR template](./adr/0000-template.md) | How to record significant technical decisions |

## Status labels

- **Current** describes behavior or structure found in the repository.
- **Proposed** describes guidance for future work, not an implemented feature.
- **Decision needed** identifies a product or engineering question to resolve
  before relying on a particular design.

These notes are a starting baseline, not a substitute for validating product
requirements, reviewing a threat model, or defining production service-level
objectives. Update the relevant document when implementation changes a stated
fact or an accepted decision changes direction.
