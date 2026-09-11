# Full Technology Stack and Open-Source Alternatives

> Status: Accepted project catalog; exact-release verification required
> Date: 2026-09-10
> Governing decisions: ADR-0008, ADR-0009, ADR-0010, ADR-0016, ADR-0017, ADR-0018, ADR-0019

This is the readable inventory for the complete Digital Commons stack. It answers
three separate questions for every capability: what the default is, whether the
default is open source, and what open-source replacements remain available.

`Yes` describes the upstream project and named edition, not every plugin, image,
provider, model, font or transitive dependency. Production admission still pins
an exact release and verifies its source, license, SBOM, security status,
accessibility, export path and operational ownership.

## Infrastructure, networking, storage and delivery

| Capability | Accepted default | Default OSS status | Open-source alternatives | Decision posture |
|---|---|---|---|---|
| Server OS | Debian Stable | Yes; distribution of free software | Ubuntu Server; Rocky Linux; AlmaLinux | One supported family per environment |
| Virtualization | KVM + QEMU + libvirt | Yes | Proxmox VE; OpenNebula | Standard Linux virtualization first |
| Containers | OCI images + containerd | Yes; open standard and Apache-2.0 runtime | CRI-O; Podman for bounded host use | Docker Desktop is unnecessary |
| Orchestration | Kubernetes | Yes; Apache-2.0 | OKD; systemd/Podman for tiny nodes | Production control API |
| Kubernetes distribution | RKE2 production; K3s edge/dev | Yes; Apache-2.0 | kubeadm; Talos Linux | No hosted control plane |
| Private cloud | Kubernetes first; selected OpenStack services when justified | Yes; OpenStack is Apache-2.0 | Apache CloudStack; OpenNebula; Proxmox VE | Do not deploy OpenStack speculatively |
| Bare-metal lifecycle | OpenStack Ironic | Yes; Apache-2.0 | Metal3 | Add after hardware evidence |
| CNI/network policy | Cilium | Yes; Apache-2.0 | Calico | Validate against campus network |
| Bare-metal load balancer | MetalLB | Yes; Apache-2.0 | PureLB | Hardware appliances stay behind standard APIs |
| Gateway/ingress | Envoy Gateway | Yes; Apache-2.0 | Traefik; ingress-nginx | Common north-south baseline |
| Service mesh | None initially; Cilium features first | No additional component | Linkerd; Istio | Add only from measured need |
| Block/file/object storage | Ceph RBD + CephFS + Ceph RGW | Yes; open source | Longhorn; Garage; SeaweedFS | S3-compatible object boundary |
| Infrastructure as code | OpenTofu + Ansible | Yes; MPL-2.0 and GPL-3.0-or-later | Pulumi Community after language/runtime review; Crossplane for API-driven cases | ADR-0017; Terraform is not the default |
| IaC state | Institution-controlled encrypted backend | Architecture pattern | PostgreSQL/S3-compatible backends supported by approved tooling | Locking, backup and restore tests required |
| GitOps | Argo CD | Yes; Apache-2.0 | Flux | Pull-based signed promotion |
| Git forge | Forgejo | Yes; GPL-3.0-or-later | GitLab Community Edition after open-feature review; Gitea | Self-host accounts and repositories |
| CI | Woodpecker CI for first slice | Yes; Apache-2.0 | Tekton; Jenkins | Self-hosted runners |
| OCI registry | Harbor | Yes; Apache-2.0 | CNCF Distribution; Zot | Scan, sign, retain and replicate |
| Backup | Velero + restic + database-native tools | Yes | Kopia; BorgBackup | Recovery evidence is mandatory |
| Configuration secrets in Git | SOPS + age where appropriate | Yes | OpenBao-issued runtime secrets | Never commit plaintext secrets |

## Identity, security, policy and integration

| Capability | Accepted default | Default OSS status | Open-source alternatives | Decision posture |
|---|---|---|---|---|
| Identity broker | Keycloak | Yes; Apache-2.0 | ZITADEL self-hosted; Kanidm | Broker, not institutional authority |
| Institutional identity upstream | Institution-approved IdP through a standards adapter | External authority may be proprietary | Keycloak, Authentik or another OSS IdP for institutions that operate one | Common clients and services consume normalized OIDC claims, never vendor APIs |
| Development identity | Synthetic Keycloak realm | Yes | Deterministic in-process test provider | Never a parallel student directory |
| Authorization/policy | Open Policy Agent | Yes; Apache-2.0 | Cedar; Casbin; Kyverno for admission policy | Domain rules remain versioned |
| Secrets service | OpenBao | Yes; MPL-2.0 | SOPS + age for static GitOps secrets | No proprietary hosted dependency |
| PKI | step-ca + cert-manager | Yes; Apache-2.0 | Institution PKI adapter; CFSSL after health review | Automate rotation and revocation |
| Workload identity | SPIFFE/SPIRE profile | Yes; Apache-2.0 | cert-manager-issued workload certificates | Required before inter-institution trust |
| Event/request broker | NATS JetStream | Yes; Apache-2.0 | Apache Pulsar; Apache Kafka | CloudEvents/AsyncAPI is durable boundary |
| Durable workflows | Temporal Community | Yes; MIT | Argo Workflows for batch; Apache Airflow for data workflows | Select by workflow semantics |
| REST contracts | OpenAPI | Open standard | JSON Schema plus generated documentation | Public HTTP baseline |
| Hot-path RPC | gRPC + Protobuf when justified | Yes/open specifications | REST/OpenAPI; Connect RPC | Never mandatory for public clients |
| Event contracts | CloudEvents + AsyncAPI | Open specifications | Protocol-specific adapters behind the envelope | At-least-once/idempotent default |
| Supply-chain metadata | SPDX or CycloneDX + Sigstore/Cosign | Open standards and OSS | in-toto attestations; ORAS artifacts | Generate and verify every release |
| API documentation | Generated OpenAPI docs | Open standard | Swagger UI; Redoc Community after release review | Documentation ships with contract |

## Data, search, geospatial and observability

| Capability | Accepted default | Default OSS status | Open-source alternatives | Decision posture |
|---|---|---|---|---|
| Relational database | PostgreSQL | Yes; PostgreSQL License | MariaDB; YugabyteDB core after distributed-SQL evidence | Service-owned schemas |
| Vector retrieval | pgvector | Yes; PostgreSQL License | Qdrant; Milvus | Separate engine only after measurement |
| Cache/coordination | Valkey | Yes; BSD-3-Clause | PostgreSQL/advisory locks; Dragonfly after exact-edition review | Avoid proprietary Redis modules |
| Search | PostgreSQL search first, OpenSearch when justified | Yes | Meilisearch; Typesense | Avoid premature search cluster |
| Object API | S3-compatible Ceph RGW | Yes | Garage; SeaweedFS; MinIO only after exact-license/edition review | Portable manifests above provider |
| Geospatial database | PostGIS | Yes; GPL-2.0-or-later | SpatiaLite | CRS, provenance and privacy metadata |
| Geospatial services | Direct OGC-style APIs as needed | Open standards | GeoServer; MapServer | Add servers only from use cases |
| Data catalog/lineage | Contract manifests first | Open formats | OpenMetadata; DataHub | Do not centralize private service databases |
| Telemetry boundary | OpenTelemetry SDKs/Collector + OTLP | Yes; Apache-2.0/open protocol | No vendor-native-only alternative is permitted | Mandatory portability layer |
| Metrics | Prometheus | Yes; Apache-2.0 | VictoriaMetrics OSS | OpenMetrics-compatible exposition |
| Dashboards | Grafana OSS | Yes; AGPL-3.0 | Perses | Dashboards remain versioned/exportable |
| Logs | Loki | Yes; AGPL-3.0 | OpenSearch | Structured, classified and redacted |
| Traces | Tempo | Yes; AGPL-3.0 | Jaeger | End-to-end OpenTelemetry context |

## AI, agents, academic and campus compute

| Capability | Accepted default | Default OSS status | Open-source alternatives | Decision posture |
|---|---|---|---|---|
| AI gateway MVP | Python + FastAPI | Yes; PSF/MIT | Go; Litestar or another approved open framework | Gateway owns policy/routing/audit |
| Client AI API | Documented OpenAI-compatible subset + native Commons API | Open contract profile | Additional open adapters | Does not require OpenAI services |
| Production LLM serving | vLLM | Yes; Apache-2.0 | SGLang; Text Generation Inference after exact-release review | Model licenses are separate |
| Local/edge inference | llama.cpp | Yes; MIT | Ollama for development; LocalAI | Low-level adapter target |
| Embeddings/reranking | Gateway-managed open model adapters | Code is OSS; **model-specific** | Text Embeddings Inference; llama.cpp-compatible models | Approve every model/data license |
| RAG | PostgreSQL + pgvector | Yes | Qdrant; Milvus | Authorized sources and provenance |
| Model metadata/tracking | Content-addressed manifests + MLflow | Yes; MLflow Apache-2.0 | Kubeflow components; DVC after review | Weights stay outside Git |
| Campus batch scheduling | HTCondor interoperability model | Yes | Slurm; Kubernetes Kueue | Commons Compute Fabric adds trust/idle/topology policy |
| Distributed Python | None until measured; Ray if required | Yes; Apache-2.0 | Dask | Not a baseline for simple inference |
| Workload isolation | OCI/containerd; gVisor for compatible higher-risk jobs | Yes | Kata Containers; dedicated KVM VM | Follows trust/data class |
| Agent workflows | Temporal-backed deterministic action services | Yes | Plain application workflow; Argo Workflows for batch | Models propose; services authorize/execute |
| Tool protocol | Versioned JSON/OpenAPI contracts | Open standards | MCP adapter after security review | Owner/scope/risk/confirmation required |
| Institutional LMS upstream | Brightspace through supported College adapter | **No; external adapter** | Moodle; Sakai; ILIAS for institutions choosing an OSS LMS | Core Academic Service stays provider-neutral |
| Development academic provider | Deterministic fixtures/reference provider | Yes | Moodle test deployment | Cannot become production authority silently |
| Notebook/research environment | JupyterLab/JupyterHub when required | Yes; BSD-3-Clause | Open OnDemand for HPC portals | Add after isolation/data policy |

## Applications, media, spatial, social and communications

| Capability | Accepted default | Default OSS status | Open-source alternatives | Decision posture |
|---|---|---|---|---|
| Commons AI Fabric web bootstrap | Verified Open WebUI v0.6.5 source only | **Yes for v0.6.5; BSD-3-Clause** | LibreChat after release review; native SvelteKit client | v0.6.6+ is excluded from OSS baseline |
| Native web framework | Svelte/SvelteKit-compatible evolution | Yes; MIT | React; Vue | Keep gateway as durable boundary |
| Coding client | OpenCode thin integration | Yes for approved release | Standard API/CLI clients; Continue after exact-release review | Pin provenance and license |
| Desktop client | OpenWork core outside `ee/` | **Yes for eligible files; MIT** | Tauri native client; native web-derived shell | Current upstream uses React/Electron; exact commit and file inventory govern; Den/EE/hosted services excluded |
| Mobile client | Happy mobile baseline | **Yes for verified baseline; MIT** | Happier feature evaluation; native Expo client; Flutter for a distinct product | Expo/React Native; self-hosted E2EE relay and no mandatory Happy cloud |
| Cross-device agent host | Commons Session Host with OpenCode adapter first | Project code must use selected OSI license | Happy Agent/Happier patterns after exact-release review | Agent protocol is replaceable; inference goes through gateway |
| Encrypted session relay | Commons Session Relay using reviewed open cryptography | Project code must use selected OSI license | Verified Happy Server baseline; Matrix after fit review | Content-blind, institution-controlled, bounded ciphertext retention |
| Media processing | FFmpeg + GStreamer | Yes; license depends on build options / LGPL family | ImageMagick; libvips for bounded image operations | Record codecs and redistribution terms |
| 3D authoring/processing | Blender + glTF | Yes; GPL-3.0-or-later/open format | OpenUSD when scene needs justify it | Preserve interchange/provenance |
| Image and colour | OpenImageIO + OpenColorIO | Yes | libvips; ImageMagick | Explicit metadata/colour handling |
| Spatial web rendering | MapLibre | Yes; BSD-3-Clause | CesiumJS | Non-spatial accessible alternatives required |
| Social protocol | ActivityPub + ActivityStreams | Open W3C standards | Fediverse Enhancement Proposals after review | No proprietary social protocol |
| Social server | Mastodon | Yes; AGPL-3.0 | GoToSocial | Institution-hosted actor domains |
| Federated photos | Pixelfed | Yes; AGPL-3.0 | Mastodon-compatible media experience | Shared media contracts, not DBs |
| Federated video | PeerTube | Yes; AGPL-3.0 | Owncast for live-first use | Rights/moderation required |
| Communities | Lemmy | Yes; AGPL-3.0 | Another eligible ActivityPub community server | Controlled federation first |
| Blogs | WriteFreely | Yes; AGPL-3.0 | Native portable publishing; another healthy ActivityPub project | Preserve exportability |
| Live media | Owncast | Yes; MIT | PeerTube live capabilities | Media Fabric handles governed processing |
| Realtime communications | Matrix protocol with Synapse as the reference server | Yes; Apache-2.0 server and open protocol | Dendrite; Prosody/XMPP interoperability adapter | Institution-hosted; federation and retention controlled by local policy |
| Notifications | NATS events + channel adapters | Yes at core | Gotify; ntfy for self-hosted push | Email/SMS vendors remain optional edge adapters |
| Mobile push wake channel | self-hosted ntfy + UnifiedPush where supported | Yes; GPL/Apache-family components subject to exact-release review | Gotify; optional APNs/FCM OS adapters | Core sync/manual refresh works without vendor push; never place content in wake payloads |
| Documentation source | UTF-8 Markdown + Git | Open formats/tooling | AsciiDoc; Zettlr as OSS editor | Obsidian is proprietary and optional only |

## Important non-open boundaries

The core has open-source substitutes for every required runtime capability.
Current institution production may still depend on proprietary Entra and Brightspace
because the College controls those authoritative systems. They terminate at
versioned adapters; another institution may use Keycloak/Authentik and Moodle/
Sakai/ILIAS without changing Commons business logic.

Obsidian is also proprietary, but it is only an optional editor for canonical
Markdown/Git files. Global hyperscalers, commercial AI APIs, SMS providers and
commercial Canadian capacity are optional provider adapters, never baseline
control planes.

## Unselected items

Some defaults deliberately stop at a project family rather than an exact artifact:
the first model and weights, PostgreSQL HA operator, OpenTofu state backend,
institutional PKI integration, codec bundle, device attestation method, and
federation broker implementation require measured or institutional evidence.
Their selection gates are tracked in the Human Choices and Decisions Register.

## Release admission checklist

Before using any default or alternative, record exact version and source commit,
license texts, transitive dependencies, container base, model/dataset terms,
cryptographic provenance, vulnerability status, maintenance owner, supported
upgrade path, backup/export method, accessibility impact and replacement test.
