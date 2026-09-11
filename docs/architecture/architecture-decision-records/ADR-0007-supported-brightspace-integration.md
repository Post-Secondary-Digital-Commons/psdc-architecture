# ADR-0007: Use Supported Brightspace Integration Mechanisms

> Status: Accepted
> Scope: Academic integrations

## Context

Scraping Brightspace pages or inventing an unofficial LMS protocol would be
fragile, difficult to authorize, and hard to secure.

## Decision

Brightspace integration uses supported D2L mechanisms such as approved APIs,
OAuth, and LTI 1.3 as appropriate. The connector translates those interfaces into
internal versioned academic contracts. Initial access is read-only and least
privilege; write actions require separate risk review and explicit confirmation.

As clarified by
[ADR-0010](./ADR-0010-provider-neutral-core-institutional-production-authority.md),
Brightspace is the expected College-approved provider for production Algonquin
academic features, while the core depends only on the internal Academic Service
contract. Development and CI use local fixtures or a test provider. General AI
continues without Brightspace; production features that require authoritative
course data become explicitly unavailable when its adapter is disabled.

## Consequences

- Integration depends on institutional approval and supported D2L contracts.
- API limitations are surfaced as constraints rather than bypassed through
  scraping.
- Contract tests and vendor-change monitoring are required.
- Disabling the connector does not disable the core platform, but it does disable
  the production academic capabilities that require authoritative LMS data.
