# Self-Service Cloud Product and Console

> Standard: PSDC-DOC-001
> Document type: product-specification
> Status: Proposed for owner and institution review; no console or paid service deployed
> Owner: PSDC Cloud and Product Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-16
> Governing decisions: ADR-0012, ADR-0015, ADR-0029, ADR-0031, ADR-0032, CLD-021 through CLD-027; proposed ADR-0036

## Purpose and users

Give an eligible person an institution-branded cloud environment that they can manage
through a console, API and CLI, without making course enrollment a prerequisite.
PSDC is the common, institution-neutral product framework; each school operates its
own identity, policy, capacity, rates, data and financial authority. The initial
console should feel like a usable cloud product, not expose disconnected Kubernetes,
OpenStack, Ceph and billing dashboards as the primary experience.

Users include an individual student or alumnus working personally, a
school-sponsored project, a developer testing or hosting an application, a research team, an institution
administrator and—only after commercial approval—a customer operating an approved
business project. Faculty or a course may grant sponsorship, but no user needs a
course enrollment solely to have an eligible personal project. The founder's
initial-pilot direction is institution-affiliated people and alumni. Each
institution still approves its enrollment and identity-proofing process before
activation. Unaffiliated public registration is a separate future release gate.

## Scope and out of scope

**In scope:** account/project lifecycle, service catalog, console and API access,
project-scoped authorization, quotas, grants, optional purchased balance, resource
provisioning, usage, export, support and commercial-profile boundaries.

**Out of scope:** choosing an Algonquin price or legal entity, admitting the general
public, card acquiring, promising AWS/Azure API parity, replacing finance books with
the PSDC ledger, certifying any site, or claiming a production deployment.

## Student-facing product model

| Concept | Owner and boundary | Visible behavior |
|---|---|---|
| Cloud account | Institution identity and eligibility authority | Sign in, security settings, student-to-alumni status, owned/sponsored projects, notices, export and closure |
| Cloud project | PSDC Cloud product boundary under one institution | Purpose, members, service profile, data policy, quotas, rate card, funding sources and resources |
| Service profile | Institution-approved policy | Personal sandbox, school-sponsored, developer/research, or commercial; controls and SLO vary |
| Service catalog | PSDC Cloud over replaceable providers | Eligible resource types, price/credit estimate, location, limits, API compatibility and availability |
| Resource | Owning service behind a PSDC contract | Create, configure, observe, renew, stop, export and delete with explainable status |
| Granted service credit | Sponsor/program entitlement, not money | Award, restrictions, usage and lawful expiry if any |
| Purchased service balance | Customer prepayment obligation, not a public token | Separate purchase/refund/chargeback history, tax treatment and available balance |
| Paid-usage opt-in | Authorized payer's project-scoped approval | Explicit rate card, budget ceiling, funding order and revocation; purchasing balance alone is insufficient |
| IRU | Metered resource accounting unit under ADR-0029 | CPU/GPU time, storage time/I/O, governed egress and comparable usage receipts |

One human may own a personal project and belong to a school or commercial project.
One project must have exactly one responsible institution and policy profile; a
federated project is linked agreements and references, not a shared super-admin.
Credits and balance attach to the authorized payer/sponsor and project, not to an
unrestricted bearer credential. Neither credit ownership nor a valid DID/VC gives
resource access without an institution policy decision.

## Console experience and accessibility

The console home shows projects, available capacity, current spending, alerts and
the next safe action. Within a project, students can see:

1. **Overview:** purpose/profile, members, current resources, region/site, support
   class, quota and estimated remaining runway.
2. **Build:** private/public-by-approval object buckets, functions/triggers, web
   services, managed databases and later VM/network/volume/GPU services. A wizard
   explains prerequisites and defaults before provisioning.
3. **Operate:** status, logs, metrics, invocation history, storage versions,
   deployment revisions, health, restart/restore and incident notices.
4. **Access:** roles, service identities, short-lived scoped credentials, keys and
   secrets. A user can revoke a credential without deleting the project.
5. **Usage and billing:** grants and purchases shown separately, price estimates,
   reservations, measured use, receipts, holds, disputed use and exportable history.
6. **Lifecycle:** suspend, resume, export and delete with retention/hold explanation.

Every core operation needs an equivalent documented API/CLI path. Keyboard access,
screen-reader labels, contrast, error recovery and understandable units are product
acceptance gates. The console must show states such as `requested`, `admitted`,
`provisioning`, `active`, `degraded`, `suspended`, `deleting` and `held`; it must not
display a successful creation merely because a backend request was queued.

## User stories and acceptance scenarios

| Story | Successful end state | Important denial/failure |
|---|---|---|
| Personal builder | Eligible user signs in, creates a personal project and deploys a small app without a course ID | Ineligible or suspended account cannot create resources; project quota enforced |
| Object-storage user | Creates a bucket, obtains scoped S3-compatible access through the institution gateway, uploads, versions, retrieves and deletes an allowed object | Unsupported S3 operation returns a documented compatibility error; backend is not directly exposed |
| Function developer | Publishes an approved artifact and connects HTTP, schedule, queue or object trigger; sees invocation logs and cost | Unapproved image, forbidden egress, missing budget or duplicate event cannot bypass admission or double charge |
| School sponsor | Records a written ownership/sponsorship agreement, assigns restricted grant credits, and resolves control under that agreement when a member graduates | A restricted academic grant cannot silently pay for commercial use; graduation alone transfers no project control |
| Purchased capacity | Authorized user requests a top-up and receives balance only after verified payment or approved invoice; separately opts the project into paid usage | Failed/duplicate/charged-back payment does not mint spendable balance; buying balance alone does not permit paid consumption |
| Business operator | Applies for commercial profile, accepts terms, configures controlled ingress and receives the approved support/SLO | Payment alone does not make a sandbox production-certified or authorize protected data |
| Graduating user | Keeps an accessible alumni account and allowed personal projects, resolves any school sponsorship, and can export eligible data | No automatic new grant; graduation alone does not close the account or delete data |
| Exhausted funding | Receives warnings, sees services paused and retains console, usage/billing, support and eligible export access | No silent use of purchased balance, automatic card charge or immediate deletion; resume only after permitted funding and checks |
| Business continuity | Approved business owner separately elects capped automatic top-ups or invoiced continuity under approved terms | Payment failure, invoice exposure or reached cap cannot silently create unlimited debt or bypass safe stop |

## Service and implementation architecture

```text
Institution-branded web console / CLI / SDK / OpenTofu
                 |
       institution control-plane gateway
       identity, project, policy, quote, quota
                 |
       service catalog and provisioning API
         /              |             \
   storage API      function/app API    VM/data API
      |                  |                 |
policy data gateway  PSDC compute lease  approved adapters
      |                  |                 |
storage authority   Kubernetes/Knative  OpenStack/PostgreSQL
      |
Ceph RGW or compatible approved provider

usage receipts -> reconciliation -> funding-source allocation
               -> finalized commitments on internal ledger
```

Cloud owns product/project state and public contracts. Identity/policy owns who may
act. Storage owns object manifests, authorization, tiers and custody; S3-compatible
SDK traffic terminates at the accepted institution-owned data-plane gateway rather
than raw RGW. Compute owns backend-neutral placement, leases and receipts; a
function-runtime adapter runs rapid invocations within approved leased capacity
instead of conducting a full reverse auction per HTTP request. Finance owns payment
and customer-balance authority. The Cosmos-derived ledger receives reconciled
commitments, not card details, user content or live scheduling state.

Ceph RGW plus an institution policy gateway is the existing S3 direction; the
supported SDK/operation subset requires conformance tests. Knative is a candidate
for Lambda-like functions, not a promise of AWS Lambda API equivalence. Kubernetes
is the first container backend; OpenStack is added when VM demand justifies its
operations. Every candidate must pass provenance, license, security and local
standalone-operation review before adoption.

## Access, privacy, security and commercial boundaries

- Default to a private project and no public endpoint. Public ingress requires
  explicit project and institution approval, DNS/TLS, abuse contact, rate limits,
  DDoS ownership and egress policy. Commercial hosting requires a separately
  certified production pool and support owner.
- Student code is untrusted even when signed. Admission checks artifact digest,
  publisher, vulnerability/license policy, requested privileges, data class,
  secrets, egress and budget. Basic hosts do not promise host-operator memory
  secrecy; optional Confidential capacity follows its own proposed assurance gate.
- Project roles and service identities grant least privilege. A temporary course
  sponsorship does not make a faculty member owner of a user's personal data.
- Data classification, residency, retention, backups, deletion, export and
  federation scope attach to each resource. A purchased balance does not make
  prohibited processing lawful or authorize a new region/provider.
- Do not store payment-card data in PSDC resource records. An institution may
  choose invoice/bank transfer or an approved card processor; no external
  processor is required for the free/granted core, but online card settlement
  cannot be made independent of banking/payment rails.

## Funding, quotas and no-surprise spending

The rate card quotes each resource class and distinguishes reserved from consumed
usage. Before provisioning, atomically check policy, quota and a spending hold.
After backend evidence is reconciled, convert the hold to a measured charge and
release any unused portion. Reservations, retries, duplicate events, missing
receipts, refunds and disputes must never create double charges or negative
balances without an approved credit-risk rule.

Keep at least two accounting columns: **grants** (who funded them, allowed use and
expiry authority) and **purchased balance** (what the customer paid, taxes/fees,
refund liability and chargeback state). The user may see an estimated total, but
the statement must reveal both columns and the configured consumption order.
Alert thresholds, a user-set hard spending cap and automatic stop/suspend behavior
are required before paid use. Purchased balance is available for a project's
billable usage only after its authorized payer explicitly opts in to that project's
current rate card and spending ceiling. Buying or holding balance is not opt-in.
Revocation blocks new paid consumption; any in-flight reservation must follow
its published cancellation and reconciliation rule. A dispute holds the contested
amount and prevents an automated provider penalty. No conversion, transfer,
withdrawal or cash
redemption follows from the word “credit.”

Finance/counsel must decide whether prepaid cloud capacity is treated as a
prepaid service, gift-card-like instrument or another category in each jurisdiction;
the architecture does not make that legal determination. Terms must resolve price
changes, expiries, inactivity, refunds, service failure, tax, fraud and closure.
The existing ADR-0015 funding model remains a separate scenario, not an approved
charge or a substitute for these customer obligations.

### Funding exhaustion and alumni lifecycle

Account status, project funding state and resource runtime state are separate.
`student -> alumni` keeps sign-in and allowed personal-project ownership; it does
not renew a student grant. A school-sponsored project follows its written
ownership and sponsorship agreement, not the student's account status alone.
The agreement must identify the controlling party and export/disposition rights
before sponsorship activates. If an agreement is absent or disputed, graduation
does not transfer control; the project enters a governed ownership review.

For each project, the funding authority evaluates applicable grants first under
their restrictions. It may draw purchased balance only with an active,
project-scoped paid-usage opt-in from an authorized payer. The opt-in records the
accepted rate-card version, spending ceiling, funding order, time and actor. It
can be revoked; no pre-existing balance or stored payment method implies consent
to future paid use. For an approved business project, an authorized payer may
separately elect automatic top-ups or invoiced continuity under approved terms,
a hard spending cap and credit-risk controls. Neither option is a default, and
reaching the cap or losing payment authority still invokes the safe-stop path.

When permitted funding runs out, reject new billable admissions and transition
existing resources through service-specific safe-stop steps. A function stops
accepting billable invocations; a VM or container receives a bounded shutdown;
public ingress ceases serving if its backing service cannot run safely. Storage
must enter an institution-funded, bounded preservation/export state rather than
silently accruing customer charges or being immediately deleted. For an exhausted
personal project, eligible data stays available for export for at least **30 days
from the funding-exhaustion pause**. The owner receives advance exhaustion and
disposition notices through approved contact channels. After day 30, deletion may
be considered but is not automatic: institution-approved retention, legal holds,
disputes and backup controls still govern it. The institution must publish the
notice schedule, export scope, preservation funding, later disposition process
and any longer local period before the pilot. A newly funded, successfully
resumed project leaves the exhaustion-preservation state; a later exhaustion
starts a new window rather than inheriting a stale deadline.

The console remains usable for status, usage, billing/dispute, support, top-up and
eligible export. On a valid grant or approved paid funding, resumption rechecks
identity, project policy, current rate card, quota, resource health and placement;
it is not an unconditional replay of old leases. A business service requiring
continuity must opt into a separately approved funding and support arrangement;
payment alone does not confer production assurance.

## Failure, recovery and operations

| Failure | Customer-visible behavior | Authority and recovery |
|---|---|---|
| No eligible capacity | Quote or request remains pending or fails with reason; no silent unsafe placement | Release provisional hold; offer only policy-safe alternatives |
| Provisioning partial failure | Show failed/degraded state and cleanup progress | Idempotent workflow and compensating action; no orphaned charge |
| Function/event duplicate | Invocation may retry but effects and billing remain idempotent | Event ID, attempt ID, bounded replay and reconciled receipts |
| Object backend down | Reads/writes follow declared availability; no false success | Storage Authority repairs/fails over only inside policy and custody rules |
| Payment provider unavailable | Existing entitled/granted use continues under policy; top-up pending | No unverified credit mint; independent core cloud operation |
| Ledger unavailable | Accepted resource use continues within approved exposure limits | Queue commitments; reconcile after recovery, no card or content on-chain |
| Project funding exhausted | Warn at thresholds; pause billable compute, functions, writes and public serving according to service-specific safe-stop procedures | Keep account, console, usage/billing, support and eligible export access; preserve eligible personal data for at least 30 days, with advance notices and no automatic deletion |
| Graduation | Transition student to alumni status; preserve accessible account and allowed personal projects | End or reassign school sponsorship under its agreement; no automatic alumni grant |
| Business continuity payment/cap failure | Notify payer and prepare service-specific safe stop; never exceed a hard cap silently | Reconcile pending top-up or invoice, preserve eligible export, and resume only after authorized funding and policy recheck |
| Account closure | Clear ownership, export, disposition and balance/refund status | Institution retention authority and finance, not course enrollment alone |

Each service requires a named owner, documented support hours, SLO, measured
capacity, backup/restore and incident runbook before production advertisement.
Commercial claims require institution-approved terms and evidence of the promised
service level. Federation and external adapters remain optional; local projects
must remain usable during partner outages.

## Delivery and acceptance gates

1. **Development-only slice:** synthetic users/projects, fake grants, an S3-compatible
   gateway subset and one HTTP function. No real money or protected student data.
2. **Institution pilot:** eligible accounts independent of courses, quotas, logs,
   export and a real provider with tested backup/restore, abuse controls and
   independent receipt reconciliation. The founder-selected population is
   institution-affiliated people and alumni. Grants only, with institutional approval.
3. **Paid pilot:** separate purchased-balance contract, approved seller, terms,
   taxes/refunds/chargeback procedures, payment integration or invoice process,
   daily reconciliation, explicit project-scoped paid-usage opt-in, support and
   negative financial fixtures. Optional capped automatic top-up and invoiced
   continuity need their own consent, exposure limits and failure fixtures.
   Feature gate off until all institutional approvals are recorded.
4. **Commercial production:** certified provider pool, public-ingress safeguards,
   named on-call and SLO, business terms, complaints/disputes, recovery and
   capacity evidence. No course pilot or payment success substitutes for this.
5. **Expanded catalog:** VM, block/file, databases, accelerator, federation and
   optional public membership only after their own contracts and site gates.

Acceptance evidence must demonstrate account creation without course enrollment;
separate grant/purchase ledgers; denied overspend; no duplicate charge on retry;
project and credential isolation; gateway-only data access; accurate usage display;
backup/restore and export; controlled deletion; independent operation during
payment/partner outage; a 30-day preservation/export clock with notices, hold and
resume cases; sponsored-project ownership review; hard-cap denial even with an
automatic top-up agreement; and clear accessibility tests. These are proposed tests,
not tests that have run.

## Open institution decisions and references

The institution must approve affiliated/alumni eligibility and proofing (public
access remains a later decision), seller of record, funding/credit grant
authorities, actual rate card, balance restrictions,
refund/expiry/tax policy, payment method, commercial terms, abuse operator, public
ingress owner, protected data classes, support tier, recovery objectives and
capacity reservation. It must also approve any longer preservation period, notice
schedule, legal-hold interaction, invoiced-credit exposure and top-up limits.
Those are not safely inherited from the Common framework.

- [Proposed ADR-0036](../architecture/architecture-decision-records/ADR-0036-self-service-cloud-and-optional-paid-capacity.md)
- [Accepted IRU model](../architecture/architecture-decision-records/ADR-0029-unified-institutional-resource-metering.md)
- [Accepted gateway boundary](../architecture/architecture-decision-records/ADR-0032-data-plane-gateway-and-two-axis-roadmap.md)
- [Cloud service taxonomy](../vision/constitutional/Commons-Cloud-Service-Taxonomy-v1.md)
- [Production boundary](../deployment/Production.md)
- [Storage architecture](../storage/Storage-Architecture.md)
