# Contract Boundaries

## Shared identity

Every internal request carries one normalized subject identity plus service
identity. Human roles originate in the institutional identity system and are
mapped by Commons Cloud's identity broker. Services authorize scopes locally.
Another institution or federation peer never becomes a local identity authority.

## Shared events

Cross-system events use versioned envelopes with an event id, type, timestamp,
producer, subject, schema version, trace context, classification, and optional
spatial context. Consumers must tolerate additive fields and process events
idempotently.

## Spatial contract

Spatial data uses stable place/scene identifiers, coordinate-reference metadata,
precision, provenance, visibility, and retention classification. Public
federation never receives precise private location by default.

## ActivityPub contract

Commons Social Fabric owns HTTP signatures, actor discovery, inbox/outbox processing,
delivery, retries, remote-media handling, federation policy, and abuse controls.
Other ecosystems request publishing or attach approved objects through internal
APIs; they do not independently expose ActivityPub endpoints.

## Compute contract

Commons Compute Fabric accepts declarative jobs describing resource requirements, artifacts,
isolation, preemption, locality, data classification, and result destinations.
Callers do not select individual worker machines.

## Academic contract

The Academic Service exposes neutral course, enrolment, content, assessment, and
authorization shapes. An LMS is authoritative only through its institution's
approved production adapter; the common contract does not select a vendor.

## Commons federation contract

Non-social federation exchanges signed capability descriptions, workload
envelopes, bounded jobs, artifact references, conformance evidence, revocation,
and resource-ledger events. It does not expose raw directories, LMS databases,
private vector stores, secrets, infrastructure state, or precise location.
