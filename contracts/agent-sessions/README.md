# Agent Session Contract

Versioned, agent-neutral contracts shared by desktop, mobile, Session Host,
Session Relay, gateway, policy, notifications, and audit services.

## Authority boundaries

- Session Host owns execution, ordered events, workspace grants, and control lease.
- Relay transports opaque encrypted envelopes and cannot authorize actions.
- Client displays state and submits authenticated commands or decisions.
- Policy service may further restrict a host action; a mobile approval can never
  weaken host or institutional policy.
- Commons AI Gateway owns model aliases, routing, usage, and provider credentials.

## Version 1 schemas

- `session-envelope.schema.json` — encrypted relay message and replay metadata.
- `permission-request.schema.json` — bound privileged-action challenge.
- `permission-decision.schema.json` — expiring signed response.
- `device-pairing.schema.json` — expiring device-key pairing challenge.

The schemas are the normative v1 wire shapes. Implementations use RFC 8785 JSON
Canonicalization Scheme before signatures, X25519 for pairwise key agreement,
HKDF-SHA-256 for key derivation, XChaCha20-Poly1305 for authenticated encryption,
and Ed25519 for signed permission decisions. A later algorithm profile is
negotiated by identifier and cannot silently downgrade an existing session.

Every implementation SHALL publish valid and invalid fixtures and pass schema,
canonicalization, replay, expiry, signature, reordering, reconnect, revocation,
lost-device, authorization and compatibility tests before release.
