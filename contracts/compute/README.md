# Compute Contract Profile

> Status: Normative contract profile, version 1

The compute profile defines NodeCapability, Workload, Job, Placement, Lease,
Checkpoint, ArtifactReference, UsageRecord, LifecycleEvent and ResultReference.
Capabilities describe architecture, CPU, memory, accelerators, storage, network,
runtime adapters, trust tier, power state and locality without encoding a vendor.

Jobs declare identity, institution, purpose, classification, resources, artifacts,
runtime, priority, preemption, deadline, retry, checkpoint, network and result
policy. Scheduling returns a signed lease; workers execute only valid leases and
emit ordered lifecycle events. Artifacts use immutable hashes and S3-compatible
references. Results preserve provenance and never expose worker credentials.

Implementations pass admission, quota, trust-tier, placement, isolation,
preemption, checkpoint, duplicate, cancellation, worker-loss, artifact-integrity,
accounting and heterogeneous-runtime compatibility tests.
