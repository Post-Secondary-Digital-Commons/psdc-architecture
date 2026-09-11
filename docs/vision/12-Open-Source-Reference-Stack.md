# Technology Reference Stack

> Status: Normative open-source reference stack; exact releases are implementation evidence
> Constraint: Every selection requires license, security, accessibility,
> operational, and institutional review before production

This catalog gives teams a predominantly open-source, self-hostable starting
point. OpenTofu and Ansible are the accepted IaC tools under ADR-0017. A named
project is a reference implementation, not a permanent contract. Shared APIs,
formats, and data remain portable.

## Infrastructure and platform

| Capability | Preferred baseline | Open alternatives / notes |
|---|---|---|
| Host operating system | Debian | Another community Linux distribution after lifecycle review |
| Virtualization | KVM, QEMU, libvirt | Standard Linux virtualization interfaces |
| Private cloud | Kubernetes first; selected OpenStack services only when justified | Apache CloudStack, OpenNebula or Proxmox VE after requirements review |
| Bare-metal lifecycle | OpenStack Ironic | Metal3 when Kubernetes-native management is justified |
| Containers | Kubernetes/OCI; RKE2 production and K3s edge/dev | kubeadm or Talos Linux subject to policy |
| Networking/CNI | Cilium | Calico remains the open exit path |
| Load balancing | MetalLB | PureLB or hardware integrations behind standard APIs |
| Gateway/ingress | Envoy Gateway | Traefik or ingress-nginx after project-health review |
| Storage | Ceph RBD, CephFS, Ceph RGW | One system provides block, file, and S3-compatible objects |
| Infrastructure as code | OpenTofu and Ansible | Terraform is a non-default compatibility option only; no hosted control plane required |
| GitOps | Argo CD | Flux |
| Registry | Harbor | OCI Distribution-compatible registry |
| Git forge | Forgejo | GitLab Community Edition only if all required features remain open |
| CI | Woodpecker CI for the first vertical slice | Tekton for Kubernetes-native pipeline needs |

## Identity, policy, security, and integration

| Capability | Preferred baseline | Notes |
|---|---|---|
| Identity broker | Keycloak | Self-hosted protocol/claim broker; College-approved Entra is expected for production institutional login |
| Secrets and encryption services | OpenBao | No proprietary Vault dependency |
| Policy evaluation | Open Policy Agent | Rego policy remains versioned and testable |
| Workload certificates | cert-manager and step-ca | Integrate with institutional PKI only through a boundary |
| Event and request messaging | NATS with JetStream | Apache Pulsar may be evaluated for larger streaming requirements |
| Durable workflows | Temporal Community | Argo Workflows for Kubernetes batch semantics |
| API contracts | OpenAPI, gRPC/Protobuf where justified | No custom RPC protocol |
| Event contracts | CloudEvents and AsyncAPI | Schema compatibility and idempotency required |

## Data and observability

| Capability | Preferred baseline | Notes |
|---|---|---|
| Relational database | PostgreSQL | Service-owned schemas and standard backup tooling |
| Vector search | pgvector first | Dedicated open vector engine only after measured need |
| Cache/coordination | Valkey | Avoid dependence on proprietary Redis modules |
| Search | PostgreSQL search first; OpenSearch only when justified | Meilisearch or Typesense |
| Telemetry | OpenTelemetry Collector and SDKs | OTLP is the internal telemetry boundary |
| Metrics | Prometheus | Long-term storage is a separate decision |
| Dashboards | Grafana OSS | Keep dashboards exportable as code |
| Logs | Loki | OpenSearch is an alternative when search requirements justify it |
| Traces | Tempo | Jaeger remains the open alternative |

## AI and compute

| Capability | Preferred baseline | Notes |
|---|---|---|
| AI gateway | Python/FastAPI Commons gateway | Go is the measured-pressure alternative; OpenAI-compatible plus native APIs |
| Production LLM serving | vLLM | SGLang alternative selected per model and hardware evidence |
| Local/edge LLM serving | llama.cpp adapter | Portable local inference |
| Batch and opportunistic compute | HTCondor interoperability | Commons Compute Fabric adds campus enrollment, trust, topology, and policy |
| Distributed Python workloads | None by default; Ray only when measured | Dask |
| Experimental heterogeneous inference | exo and SwarmLLM adapters | Research tier, never baseline dependency |
| Model/artifact storage | Ceph RGW plus content-addressed manifests | Weights stay outside Git |
| Model tracking | MLflow | Validate open edition against requirements |

## Media, spatial, federation, and clients

| Capability | Preferred baseline | Notes |
|---|---|---|
| Media processing | FFmpeg and GStreamer | Pipelines remain engine-independent |
| 3D authoring/processing | Blender | glTF-first interchange where suitable |
| Image/color pipelines | OpenImageIO and OpenColorIO | Preserve provenance and color metadata |
| Social federation | ActivityPub/ActivityStreams | Commons Social Fabric owns the public federation edge |
| Social products | Mastodon, Pixelfed, PeerTube, Lemmy, WriteFreely, Owncast | Adopt or thin-fork after interoperability review |
| Web client | Independent `psdc-web` browser/PWA product; verified Open WebUI v0.6.5 BSD source is the eligible bootstrap | Frozen provenance-controlled baseline; evolve toward native Study/Work/Code/Campus UX; AI Fabric remains the API producer |
| Desktop clients | OpenWork MIT core outside `ee/` | Current upstream React/Electron is accepted only after ADR-0018 gates; Tauri remains the replacement path |
| Mobile clients | Happy MIT Expo/React Native baseline | Self-hosted E2EE relay required by ADR-0019; Flutter remains an alternative for a distinct product |
| Documentation | Plain Markdown and Git | Obsidian is optional; Zettlr or other OSS editors remain viable |

Open WebUI v0.6.6 and later is deliberately excluded from this baseline because
[its branding restriction is not OSI-approved](https://docs.openwebui.com/license/).
Commons AI Fabric may test protocol compatibility with it, but cannot require it. ADR-0009
selects the older BSD-3-Clause v0.6.5 source as a preferred bootstrap, subject to
legal, provenance, security, accessibility, and maintenance gates.

## Official project references

- [OpenStack](https://docs.openstack.org/install-guide/get-started-with-openstack.html)
- [Kubernetes](https://kubernetes.io/)
- [Ceph](https://ceph.io/en/)
- [Keycloak](https://www.keycloak.org/)
- [OpenBao](https://openbao.org/)
- [Valkey](https://valkey.io/topics/introduction/)
- [OpenTelemetry](https://opentelemetry.io/)
- [Open Policy Agent](https://www.openpolicyagent.org/)
- [NATS](https://nats.io/)
- [OpenTofu](https://opentofu.org/)
- [Forgejo](https://forgejo.org/)
- [Harbor](https://goharbor.io/)
- [OpenCode source and MIT license](https://github.com/anomalyco/opencode)
- [Open WebUI license history](https://github.com/open-webui/open-webui/blob/main/LICENSE_NOTICE)

## Alternatives and exact versions

The accepted defaults and evaluated alternatives are consolidated in
[Technology Defaults and Alternatives](13-Technology-Defaults-and-Alternatives.md).
The project choices are accepted; exact releases, deployment values, accountable
institutional owners, and production approvals remain evidence gates.
