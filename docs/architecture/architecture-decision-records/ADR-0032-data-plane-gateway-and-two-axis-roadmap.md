# ADR-0032: Data-Plane Gateway Boundary and Two-Axis Roadmap Model

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Accepted
> Owner: PSDC Architecture Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-05
> Governing decisions: ADR-0012, ADR-0013, ADR-0016

> Date: 2026-10-05
> Scope: client access to storage, inference and workers; ordering of common implementation work versus institution adoption
> Decision owner: PSDC founder

## Context and decision drivers

Two questions surfaced during the cross-review of the vision, architecture and roadmap drafts.

**Client access to backends.** The reference architecture and the Ecosystem Dependency Contract already say that no client reaches a worker agent, an object store or a model runtime directly. A review hardening pass loosened the control-plane and data-plane rule (CP-1) to allow a client to use a signed URL or scoped token directly against a storage, media or inference endpoint. That contradicted the accepted rule and was reverted. The founder was asked to confirm the restored rule.

**Two orderings in the roadmap.** The roadmap documents carry two sequences: eleven institution phases (0 to 10) that order adoption, authorization and operational readiness, and five common implementation waves (A to E) from the vertical-slice plan. Presented as one path they appeared to contradict each other, for example "AI and web come before compute" against "the compute task is the first implementation slice and the cohesive client session is last".

Drivers: one reliable enforcement point per institution for authorization, classification, residency, purpose, quota, revocation and audit; replaceable backends; and a safe way to build components early without implying that an institution has authorized them.

## Decision

### 1. Data-plane gateway boundary

- A client talks to the control plane for identity, authorization, policy and bounded capability.
- A client moves bytes and streams inference only through an institution-owned, policy-enforcing data-plane gateway.
- A client never reaches a worker, a storage backend or a model runtime directly. This restores and confirms the existing no-bypass rule; it adds no new constraint.
- Short-lived capabilities may be used between the gateway and a backend.
- Direct client access to a backend by signed URL, scoped token or similar capability is not permitted by default. Allowing it requires a superseding ADR that covers endpoint classification, token audience, method, path and object binding, expiry, replay and one-time use, data classification, logging, the limits of offline revocation, confused-deputy and server-side request forgery protection, and backend trust, and that reconciles every no-bypass statement in the reference architecture, the Ecosystem Dependency Contract, the dependency map and the control-plane and data-plane document.

The gateway protocol, topology and performance design remain proposals until contracted and implemented.

### 2. Two-axis roadmap model

- Phases 0 to 10 order institution adoption, authorization and operational readiness.
- Waves A to E order common implementation work, which may proceed on synthetic data before any institution operates it.
- Building a wave early on synthetic data is never evidence that a phase gate has passed.
- The accepted mapping from wave to the earliest phase that may operate it is:

| Common wave | Earliest phase that may operate it |
|---|---|
| A: contracts and development foundations | 3 |
| B: VS-01 idle lab-node compute and institutional-credit settlement | 7, for campus operation |
| C: VS-02 to VS-06 (Kubernetes service, OpenStack VM, Slurm HPC job, private hot object, private content distribution) | 7 or later |
| D: VS-07 and VS-08 (governed federation storage, portable student identity) | 9 |
| E: VS-09 client-to-AI session | 4 for the minimal web vertical slice; 5 for the supported web, desktop and mobile sandbox experience |

## Consequences

- Gateway enforcement becomes the single place to prove institution policy; backend products stay replaceable and invisible to clients.
- Bulk transfer and inference streaming need a gateway that can sustain them; its design is future work and a performance risk.
- Roadmap documents no longer present waves and phases as one critical path.
- Decision owners, calendars and budgets remain undecided; this ADR does not set them.

## Alternatives and options considered

| Option | Benefit | Rejection or qualification |
|---|---|---|
| Control-plane-issued signed URLs for direct backend access | Efficient bulk transfer | Rejected as a default: moves policy enforcement into every backend, exposes backend topology, weakens revocation and fragments audit. Revisit only by superseding ADR. |
| Route all payloads through the control-plane decision service | Simplest enforcement | Rejected: the control plane would become a data-plane bottleneck. |
| One linear roadmap path | Simpler to read | Rejected: it conflates implementation order with institutional authorization. |
| Two axes with an explicit mapping | Keeps both true | Accepted. |

## Migration and rollback

The control-plane and data-plane document restores CP-1 and the roadmap documents carry the wave and phase matrix. Reversing either decision requires a superseding ADR and the same reconciliation of every document that states the rule. No code or deployment depends on either decision yet, so rollback has no operational cost today.

## Binary acceptance criteria

- `ADR32-ACC-001`: no document states that a client may reach a storage backend, model runtime or worker directly without a superseding ADR.
- `ADR32-ACC-002`: before any storage or inference capability is exposed to clients, a conformance test shows a client cannot reach the backend except through the gateway.
- `ADR32-ACC-003`: every roadmap document that mentions both waves and phases states which axis each belongs to.

## References

- [PSDC Platform Reference Architecture](../../vision/constitutional/PSDC-Platform-Reference-Architecture.md)
- [Ecosystem Dependency Contract](../Ecosystem-Dependency-Contract.md)
- [Control Plane vs Data Plane](../Control-Plane-vs-Data-Plane.md)
- [Human Choices and Decisions Register](../../governance/Human-Choices-and-Decisions-Register.md)
