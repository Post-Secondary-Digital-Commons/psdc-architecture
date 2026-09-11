# Media Contract Profile

> Status: Normative contract profile, version 1

The media profile defines Asset, UploadSession, ContentDigest, TechnicalMetadata,
Rights, Provenance, TransformJob, Rendition, DeliveryManifest, SpatialReference,
ModerationState and LifecyclePolicy. Source assets and renditions use immutable
content digests and S3-compatible references rather than shared databases.

Uploads are resumable, size-bounded, authenticated and scanned before publication.
Transforms declare deterministic inputs, tool and model versions, parameters,
resource limits and result digests. Rights and moderation decisions travel with
references and are rechecked at delivery. Protected spatial and identity metadata
is excluded from public renditions by default.

Implementations pass upload resume, hash integrity, malware, malformed media,
rights, moderation, deterministic rendition, deletion propagation, accessibility,
streaming fallback and cross-product reference tests.
