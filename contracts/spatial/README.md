# Spatial Contract Profile

> Status: Normative contract profile, version 1

The spatial profile defines Place, CoordinateReference, Geometry, Scene,
SpatialAsset, Capture, Anchor, Route, VisibilityPolicy and PrecisionPolicy.
Geometry uses GeoJSON and declared coordinate reference semantics; 3D scenes use
glTF or OpenUSD references where appropriate. Every record states provenance,
accuracy, observation time, owner, classification and allowed precision.

Private, safety-sensitive or accessibility-sensitive locations default to the
least precise representation needed for the authorized purpose. Public federation
never receives a more precise location than local policy permits. Indoor maps,
device captures and real-time position require explicit authority and retention.

Implementations pass coordinate, precision reduction, access, redaction, stale
data, route accessibility, reference integrity, deletion and cross-client tests.
