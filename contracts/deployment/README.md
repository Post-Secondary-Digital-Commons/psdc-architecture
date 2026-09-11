# Institution Deployment Contracts

Neutral contracts used to configure a complete institution-owned deployment.

- `deployment-manifest.schema.json` defines the public, signed configuration used
  by web, desktop and mobile clients.

The v1 manifest contains public endpoints, OIDC client configuration, branding,
feature policy and trust/rollback metadata. It never contains client secrets,
provider credentials, session keys or infrastructure credentials.

Manifests use RFC 8785 JSON canonicalization and an external Ed25519 signature
envelope containing key ID, sequence, issued time, expiry, payload digest and
signature. Clients pin an institution trust root, reject expired or decreasing
sequences beyond the declared rollback window, retain the last valid manifest
for safe recovery, and expose validation failure without applying partial values.

Implementations SHALL provide valid, expired, tampered, rollback, key-rotation,
unknown-field and cross-institution fixtures and compatibility tests.
