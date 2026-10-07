# AI Cache Taxonomy and Isolation

> Standard: PSDC-DOC-001
> Document type: architecture-specification
> Status: Normative
> Owner: PSDC AI and Storage Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0028, ADR-0033

## Purpose and scope

This specification prevents four unlike forms of reuse from being collapsed into
one unsafe “AI cache.” It governs session UI state, semantic result reuse, context
packages and model KV/prefix caches.

### Out of scope

Long-term authoritative records, training datasets, object-storage durability and
model artifact distribution are governed elsewhere and MUST NOT be relabelled as
session caches.

## Architecture and interfaces

Clients expose local state only through the session protocol; the AI gateway owns
semantic-cache lookup; the session service owns context packages; inference
runtimes own KV state. Interfaces exchange references and scoped cache metadata,
never another component's private database or tensor format.

## Taxonomy and ownership

| Class | Contents | Owner | Default sharing | Rebuildable |
|---|---|---|---|---:|
| UI/session state | local draft, cursor, presentation and temporary controls | client | device/session only | yes |
| Semantic result cache | answer/artifact plus evidence and policy scope | AI gateway | no cross-user sharing unless explicitly approved | usually |
| Context package | structured goal, facts, evidence, constraints and questions | session orchestrator | authorized session consumers | yes from authoritative evidence, when available |
| KV/prefix cache | model-specific attention state | inference runtime/cache layer | identical model/version and approved trust scope only | yes by recomputation |

## Normative requirements

- `AI-CACHE-001`: Every cache entry MUST declare class, institution, purpose, classification, owner, model or schema version, policy version, creation, expiry and invalidation key.
- `AI-CACHE-002`: Cache lookup MUST include the authorized sharing scope; a content match alone is insufficient.
- `AI-CACHE-003`: A KV cache MUST NOT be treated as portable between different model weights, architectures or incompatible tokenizers.
- `AI-CACHE-004`: Semantic reuse MUST revalidate evidence freshness and policy before response release.
- `AI-CACHE-005`: Protected caches MUST use cryptographically strong collision-resistant keys and tenant/user salts where timing or collision could leak content.
- `AI-CACHE-006`: Deletion and consent withdrawal MUST invalidate governed entries and create restoration-safe tombstones where backup policy requires them.
- `AI-CACHE-007`: A cache miss MUST affect performance only; it MUST NOT alter authorization or correctness requirements.

## Dependencies and failures

| Failure | Effect | Response |
|---|---|---|
| cache unavailable | additional prefill/retrieval cost | recompute within capacity budget |
| collision or scope mismatch | possible data disclosure | reject entry, quarantine cache segment, security incident |
| stale evidence | incorrect answer risk | invalidate and refresh |
| incompatible model version | unusable KV state | miss and recompute |
| deletion backlog | privacy nonconformance | disable affected sharing and escalate |

## Security and privacy

Authorization precedes lookup. Encryption, integrity, scoped salts, short expiry,
access logging and deletion propagation protect entries. Cache telemetry records
class and hit outcome without query or response content.

## Capacity and scaling

Operators size each cache independently and cap memory/disk consumption. Eviction
affects latency rather than correctness. Hot-entry pressure MUST NOT evict
revocation tombstones before their governing retention window.

## Open-source implementation path

vLLM or SGLang may provide prefix reuse; LMCache may provide tiered KV reuse;
Valkey/PostgreSQL-compatible services may index semantic entries. Products are
replaceable and require pinned provenance, isolation tests and measured value.

## Testing and evaluation

Conformance includes collision, timing, scope, expiry, revocation, deletion,
model-version and outage tests plus measured hit value on representative traffic.

## Acceptance criteria

- `AI-CACHE-ACC-001`: cross-user and cross-institution timing probes cannot reuse a protected prefix entry.
- `AI-CACHE-ACC-002`: model-version change forces a KV miss.
- `AI-CACHE-ACC-003`: evidence revocation invalidates every semantic entry that cites it.
- `AI-CACHE-ACC-004`: deleting a session makes its context package and governed caches unavailable after the declared deletion window.

## References

- [Session Context Package](./Session-Context-Package.md)
- [Retention](../governance/Retention.md)
- [ADR-0028](../architecture/architecture-decision-records/ADR-0028-private-content-and-storage-fabric.md)
