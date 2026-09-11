# Spatial Platform

Spatial support is a shared capability, not a single application. Every ecosystem
may attach spatial context using the same versioned contract while keeping its own
domain behavior and access controls.

## Domain uses

| Ecosystem | Spatial use |
|---|---|
| Commons Cloud | Place/scene identity lookup, access policy, indexing, and events |
| Commons Compute Fabric | Hardware locality, topology, scheduling zones, and data locality |
| Commons AI Fabric | Campus graph, place-aware assistance, spatial reasoning, and agents |
| Commons Media and Spatial Fabric | Captures, cameras, poses, scenes, 3D assets, and 4DGS |
| Commons Social Fabric | Place-aware communities, events, media, and federated objects |

## Privacy defaults

- Precise location is private unless an explicit policy and user action allow it.
- Public/federated objects use reduced precision or a public place identifier.
- Every spatial assertion records source, precision, time, confidence, and
  retention classification.
- Systems exchange identifiers and contract-shaped metadata, not unrestricted
  location histories.
- Federation peers receive only the precision, purpose, geography, and retention
  explicitly permitted by the workload or publication envelope.
