# ADR-0036: Self-Service Cloud with Optional Paid Capacity

> Standard: PSDC-DOC-001
> Document type: adr
> Status: Proposed; founder product direction recorded, commerce not institution-approved
> Owner: PSDC Cloud, Product and Economics Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-16
> Governing decisions: ADR-0010, ADR-0012, ADR-0015, ADR-0029, ADR-0031, ADR-0032, CLD-021 through CLD-024
> Date: 2026-10-15
> Decision owner: PSDC founder for product direction; each institution for commercial activation

## Context

The current cloud taxonomy permits compute, object storage, data, network and developer
services, but its student-facing documents still treat access largely as an academic
pilot or contain generic stubs. The founder wants an institution-branded cloud console
similar in usability to major cloud consoles: an eligible person can create a personal,
school, development or approved business project **without enrolling in a course**.
They may receive governed service credits and, once an institution has authorized a
commercial offer, purchase additional capacity. A course can sponsor a project but is
not the identity or eligibility boundary.

This direction does not make PSDC an AWS/Azure API clone, authorize public signup,
approve a fee, or authorize collection of payment. ADR-0015's CA$30 enrolled
student-month is a separate **funding-model assumption**, not a user subscription or
authority to charge. FIN-006's current institutional-funding presentation remains in
force for that channel. Paid cloud use is a proposed *additional* channel requiring
explicit finance, legal, privacy, security, procurement and institutional approval.

## Proposed decision

1. PSDC Cloud offers an institution-owned self-service **cloud account** and one or
   more **cloud projects**. Project purpose is personal, school-sponsored, developer,
   research or approved commercial. Course enrollment is optional metadata or a
   sponsor relationship, never the universal access prerequisite.
2. A single institution-branded console and versioned API/CLI expose project creation,
   service catalog, object buckets, functions, applications, databases, and—when the
   corresponding backend is certified—VMs, networks, volumes and accelerator jobs.
   It exposes identity, permissions, quotas, rates, usage, logs, recovery and export.
   Backend products remain replaceable behind PSDC contracts.
3. **Granted service credits** and **purchased service balance** are distinct funding
   sources. They may be shown together as available spending capacity only if the UI
   also clearly shows origin, restrictions, expiry if lawfully approved, refund status
   and consumption order. Both fund measured service consumption; neither grants
   permission or becomes a transferable/public token. IRUs remain the resource
   measurement unit under ADR-0029.
4. Payment initiation and financial records belong to a governed institution billing
   boundary, not the compute scheduler or Cosmos-derived settlement ledger. The
   operational database atomically holds budget before provisioning and reconciles
   metered usage; the ledger receives finalized commitments under ADR-0031. Card
   details must never enter PSDC's platform records. Invoice/bank-transfer pathways
   may be offered; any card path requires an approved external acquiring/payment
   arrangement. Core free or institution-funded cloud operation remains independent
   of external payment partners.
5. A commercial project is a distinct risk and service profile, not a larger quota on
   a teaching sandbox. Its public ingress, data classes, abuse response, support,
   backups, SLO, pricing and legal terms require named institution owners. It cannot
   inherit a production claim from a paid balance or a student identity.
6. The accepted institution-owned policy-enforcing data-plane gateway remains the
   client boundary. S3-compatible SDK access targets that gateway, not raw Ceph or
   another storage provider. Function triggers and runtime endpoints likewise pass
   through institution policy. Compatibility claims name tested API subsets.
7. An eligible person's cloud account remains accessible after graduation as an
   **alumni account**. Graduation ends neither identity nor ownership of an allowed
   personal project. It does not automatically award another grant. A school-owned
   or sponsored project's ownership and sponsorship follow its explicit agreement.
8. The initial pilot population is limited to institution-affiliated people and
   alumni, subject to institution approval and without a course-enrollment
   prerequisite. Unaffiliated public registration is a later,
   separately approved release gate; a DID, VC or purchased balance does not
   establish eligibility or authorization by itself.
9. When a grant is exhausted, a project may consume purchased balance **only after
   its authorized payer explicitly opts in to paid usage** for that project and
   accepts its rate card and spending ceiling. Buying balance is not that opt-in.
   No automatic card charge or credit extension follows from grant exhaustion.
10. If no permitted funding remains, the platform pauses billable services rather
    than silently charging the user or deleting the account. Sign-in, usage and
    billing review, support, and eligible data export remain available. Resource
    retention, non-billable preservation cost, notice and restart semantics need
    published institution-approved terms before a live pilot.

## Consequences and review gates

- The [self-service cloud product proposal](../../product/Self-Service-Cloud-Product-and-Console.md)
  gives candidate journeys, interfaces, failure handling and staged release gates.
- The founder selected affiliated users and alumni for the first pilot on
  2026-10-16. That product direction does not itself authorize an institution to
  activate registration; public signup remains a separate future decision.
- No paid top-up, refund rule, expiry, tax treatment, public offer or business-hosting
  promise activates before institution counsel, finance, consumer-protection/privacy,
  security and service ownership approve it. Pricing and service terms need publication
  before money is accepted.
- Existing contract candidates do not define financial purchase/refund/chargeback
  lifecycles or a student cloud service catalog. They need versioned contracts and
  negative fixtures before implementation handoff.
- Graduation is an account-status transition, not account closure. An alumnus may
  keep an allowed personal project without an automatic new grant. Account closure,
  sponsorship changes and funded-service suspension require distinct export and
  disposition workflows.

## Alternatives

| Alternative | Why this proposal does not choose it |
|---|---|
| Course-only sandbox | Prevents personal development and approved ongoing projects. |
| One undifferentiated credit balance | Conceals whether funds are grants or customer prepayment, and complicates restrictions, refunds and audit. |
| Public tradable token or automatic cash redemption | Conflicts with non-transferable IRUs and introduces unsupported financial/legal obligations. |
| Put card processing inside the cloud control plane | Expands payment-data risk and makes core sovereignty depend on card infrastructure. |
| Promise AWS/Azure feature parity | SDK and operational compatibility must be measured per service and cannot be inferred from a backend brand. |

## Migration and rollback

Existing institution-funding and academic pilot records remain unchanged. A new
service-account/project model must map or migrate them explicitly rather than assume
that a course equals a cloud account. Commercial activation uses a feature gate that
starts disabled, a separate ledger of customer liabilities and a rehearsed refund and
reconciliation procedure. Rollback stops new purchases and public/commercial
provisioning while preserving paid balances, access to existing data under the agreed
terms, export, dispute and refund routes. It must not erase financial or usage history.
