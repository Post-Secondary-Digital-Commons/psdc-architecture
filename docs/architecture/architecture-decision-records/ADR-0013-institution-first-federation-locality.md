# ADR-0013: Institution First, Federation Second, Commercial Infrastructure Last

> Status: Accepted
> Date: 2026-09-10
> Scope: Compute, storage, models, knowledge, agents, services, media, and recovery

## Context

Each institution must remain sovereign and independently functional while trusted
post-secondary federation can share permitted capacity and services. Commercial
cloud should not become the automatic fallback when public institutional capacity
exists.

## Decision

Every routable workload carries an allowed execution/data envelope. Within that
envelope, the default locality ladder is:

1. user device or local resource;
2. institution dedicated capacity;
3. institution campus compute/storage fabric;
4. nearby or regional post-secondary federation;
5. provincial post-secondary federation;
6. Canadian post-secondary federation;
7. approved Canadian-hosted commercial provider;
8. approved global hyperscaler or external API as last resort;
9. queue or fail explicitly when no permitted tier is available.

The scheduler may skip an allowed tier that cannot meet security, residency,
latency, capability, reliability, sustainability, or cost requirements. It must
never widen the permitted envelope merely to complete a request.

Federation exchanges capability, permitted services, artifacts, and accounted
resource use—not raw identity databases, unrestricted LMS data, private vector
stores, or blanket access to campus machines.

Cross-institution settlement uses an auditable resource ledger for contributed
and consumed CPU/GPU time, storage, bandwidth, model hosting, availability, and
quality. Cryptocurrency or blockchain is not required.

## Consequences

- Federation policy is part of every relevant contract and job envelope.
- Canadian residency and institutional sovereignty are enforceable routing inputs.
- Commercial providers are replaceable adapters, never the shared protocol.
- ACF census and measured capacity precede claims about recovered compute.
- Disaster recovery may use federation only for data and services explicitly
  approved for that scope.

