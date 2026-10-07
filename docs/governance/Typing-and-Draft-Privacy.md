# Typing and Draft Privacy

> Standard: PSDC-DOC-001
> Document type: governance-standard
> Status: Normative
> Owner: PSDC Privacy and Product Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0033

## Purpose, scope and authority

This policy protects unsubmitted text, corrections, pauses and typing cadence in
AI clients. It applies to web, desktop and mobile clients, gateways, analytics,
session services and institution overlays. Institution privacy authority may
tighten the rule but may not silently enable pre-submit transmission.

## Normative rules

- `PRIV-DRAFT-001`: Unsubmitted drafts and raw inter-keystroke timing MUST remain on the user's device by default.
- `PRIV-DRAFT-002`: Typing speed, pauses and corrections MUST NOT determine priority, quota, price, academic standing, risk or eligibility.
- `PRIV-DRAFT-003`: Anticipatory processing requires separate explicit opt-in, an active visible and assistive indicator, immediate pause, and purpose-specific consent.
- `PRIV-DRAFT-004`: Anticipatory mode MUST debounce and cancel stale requests and MUST NOT send raw timing data.
- `PRIV-DRAFT-005`: Pre-submit content MUST NOT enter durable memory, semantic caches, training data, analytics or institutional records by default.
- `PRIV-DRAFT-006`: Withdrawal stops new anticipatory requests and schedules governed copies for deletion; already disclosed content follows the documented deletion limitation.
- `PRIV-DRAFT-007`: Accessibility features MUST NOT be treated as permission to profile disability or cognitive state.

## Required controls

Required controls are local draft storage, explicit transmission boundaries,
consent validation, network-level regression tests, cancellable generations,
telemetry allowlists and deletion propagation.

## Enforcement, deny behavior and exceptions

Clients enforce local draft boundaries; gateways reject anticipatory requests
without current consent and policy scope. Analytics rejects timing and draft
fields. Exceptions require privacy and accessibility approval, a defined study,
minimum data, expiry, participant withdrawal, retention and deletion evidence.

## Threat and abuse cases

Threats include covert keylogging, behavioural biometrics, disability inference,
academic surveillance, stale background work, shoulder-surfing, malicious browser
extensions and draft recovery from logs or crash dumps. Controls include local
processing, memory-safe handling, no content telemetry, cancellation generations,
encrypted crash data and transparent client state.

## Audit evidence and review

Evidence records consent version, mode transition, minimized request count,
cancellation and deletion outcome without storing draft content. Review occurs
annually and after a privacy incident, client architecture change or new telemetry.

## Acceptance criteria

- `PRIV-DRAFT-ACC-001`: packet capture during default typing contains no draft or timing event.
- `PRIV-DRAFT-ACC-002`: enabling, pausing and withdrawing anticipatory mode is accessible and independently logged.
- `PRIV-DRAFT-ACC-003`: changing a draft cancels the stale generation and prevents its result from appearing.
- `PRIV-DRAFT-ACC-004`: analytics schemas reject raw draft and inter-keystroke fields.
- `PRIV-DRAFT-ACC-005`: an expired exception stops applying automatically.

## Maturity

The policy is accepted architecture. Production maturity requires client,
gateway, analytics and deletion evidence from the institution deployment.

## Definition of done

The policy is done for a release only when default and anticipatory modes pass
network, consent, withdrawal, accessibility, analytics rejection and deletion
tests on every supported client.

## Change control

Weakening local-by-default drafts, permitting raw timing transmission or using
typing behavior for allocation requires a superseding ADR and privacy,
accessibility, security and student-governance review.

## References

- [Consent](./Consent.md)
- [Privacy by Design](./Privacy-by-Design.md)
- [Minimal Conversation Experience](../product/Minimal-Conversation-Experience.md)
