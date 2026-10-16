# Self-Service and Paid Cloud: Primary-Source Notes

> Standard: PSDC-DOC-001
> Document type: historical-record
> Status: Research, not a PSDC decision or legal opinion
> Owner: PSDC Cloud and Product Working Groups
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-15
> Governing decisions: Accepted ADRs and institution approvals supersede this note
> Date: 2026-10-15
> Scope: Student/personal/business self-service cloud and optional purchased service credits
> Checked: 2026-10-15
> Evidence: Official project documentation and Canadian/Ontario regulator or standards-body material only

## Product and platform precedents — documented facts

| Source | What it establishes | Boundary for PSDC |
|---|---|---|
| [OpenStack Horizon user dashboard](https://docs.openstack.org/horizon/latest/en_GB/user/log-in.html) and [object-container actions](https://docs.openstack.org/horizon/latest/en_GB/user/manage-containers.html) | End users can select a project and manage instances, images, volumes, networks, security groups, floating IPs, and Swift containers/objects through a console. | Horizon demonstrates a usable cloud-console precedent, but its object view is for Swift containers, not proof of the PSDC S3-compatible gateway experience. PSDC's cross-fabric project, wallet, consent, catalog, and policy UX still need design. |
| [OpenStack Keystone project/role model](https://docs.openstack.org/keystone/latest/admin/cli-manage-projects-users-and-roles.html) | Projects organize resources; users can be assigned roles on one or more projects; project quotas can change. | Backend project IDs should map to, not replace, the PSDC-owned account/project authority. Personal, school, and business projects need distinct ownership and policy. |
| [Horizon quota administration](https://docs.openstack.org/horizon/2026.1/en_GB/admin/set-quotas.html) | Compute and block-storage quotas can be configured for projects and, for some services, users. | A technical quota is not a prepaid balance, price quote, tax calculation, or billing entitlement. |
| [Apache CloudStack UI](https://docs.cloudstack.apache.org/en/latest/adminguide/ui.html) and [projects](https://docs.cloudstack.apache.org/en/latest/adminguide/projects.html) | CloudStack supplies administrator/end-user web UI; projects group collaborators and resources; usage can be attributed to accounts or projects. | Candidate pattern for a coherent console, not an automatic fit with the already accepted PSDC OpenStack/Kubernetes/Slurm/federated backend choices. |
| [CloudStack Usage Server](https://docs.cloudstack.apache.org/en/latest/adminguide/usage.html) and [Quota Plugin](https://docs.cloudstack.apache.org/en/latest/plugins/quota.html) | Usage records can be rated under operator tariffs. CloudStack explicitly says the plugin does not provide native invoices; billing must be external. | Metering, rating, credit balance, invoice/tax, payment capture, and dispute settlement must be separate responsibilities. Account-lock behavior needs a PSDC service-continuity policy before adoption. |
| [OpenStack CloudKitty](https://docs.openstack.org/cloudkitty/latest/index.html) | CloudKitty rates collected metrics; it explicitly does **not** enforce resource limits at a price threshold or add taxes, convert currency, or issue customer bills. | Candidate rating engine only; it cannot be called the PSDC wallet or billing system. |

## Payments, tax, privacy and consumer law — official source observations

These sources identify review gates, **not** a conclusion that a particular PSDC credit is a gift card, payment instrument, or taxable supply. The result depends on who sells it, what it buys, transferability, redemption terms, buyer location, and which institution operates it.

| Source | Documented point | Required specialist question |
|---|---|---|
| [Ontario consumer guidance on gift cards](https://www.ontario.ca/page/buying-or-using-gift-cards) and [current e-Laws page for the Consumer Protection Act, 2023](https://www.ontario.ca/laws/statute/23c23) | Ontario describes restrictions and exceptions for gift cards and identifies other products outside those rules. The e-Laws page currently marks the 2023 Act as **not yet in force**; its text must not be applied as operative law solely because it is published. | Which current Ontario rules, if any, apply to prepaid PSDC service credits, promotional grants, course grants, and business accounts? Which terms may expire or be refunded? Check commencement and regulations at launch. |
| [CRA gift-certificate policy P-202](https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/p-202/gift-certificates.html) | The CRA distinguishes issuance/sale of a qualifying gift certificate from its later redemption for a taxable supply, and gives attributes used in its analysis. The page warns it may not reflect all subsequent legal changes. | Do purchased PSDC credits meet that definition, or are they advance payment for a specified digital service? At what event is GST/HST accounted for? |
| [CRA GST/HST and e-commerce](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-specific-situations/e-commerce.html) and [place-of-supply rules](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-place-supply.html) | Tax treatment and rates depend on the nature and location of the supply; computer-related services have specific place-of-supply rules. | Who is the seller of record for an institution and for inter-institution federation? Which buyer and usage-location data are needed without over-collecting? |
| [Bank of Canada PSP registration criteria](https://www.bankofcanada.ca/2026/06/criteria-for-registering-payment-service-providers/) | The Retail Payment Activities Act analysis includes whether payment functions are distinct or incidental, electronic funds transfers, geographic reach, and exclusions including internal/closed-loop transactions. | Would a *specific* PSDC top-up, transfer, refund, or federation-settlement design cross a payment-service boundary? Seek counsel's review before enabling cash-equivalent transfers or payouts. |
| [Office of the Privacy Commissioner of Canada: commercial activity](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda-compliance-help/pipeda-interpretation-bulletins/interpretations_03_ca/) | Non-profit or educational status alone does not determine whether a particular data use is commercial activity under PIPEDA; context matters. | Determine privacy authority, notices, controller/operator roles and data separation for personal, academic and business tenants. |
| [PCI Security Standards Council: fully outsourced card payments](https://www.pcisecuritystandards.org/faqs/does-pci-dss-apply-to-merchants-who-outsource-all-payment-processing-operations-and-never-store-process-or-transmit-cardholder-data/) | Outsourcing card processing reduces scope but does not automatically eliminate merchant compliance obligations; the acquiring/payment brand determines validation requirements. | Prefer a processor-hosted checkout that keeps card data out of PSDC, then confirm merchant and institution obligations with the acquirer. An external payment processor could be optional for *paid* top-ups without being mandatory for sovereign core operation. |

## PSDC design inferences — proposals, not source claims

1. Keep **service credits** institution-issued, non-transferable and non-cash-redeemable under the existing IRU model. Distinguish promotional/school grants, purchased prepaid value, adjustments, holds and consumed usage in separate ledger accounts or sub-balances. Do not imply that this separation resolves legal or tax classification.
2. Make personal, academic, team, research and business **project purposes** available without a course-enrolment prerequisite. Each project has its own identity roles, data classification, spend ceiling, resource quotas, abuse policy, retention terms and export path. A user may belong to multiple projects without commingling their data or bills.
3. Show a **price estimate before creation**, current spend, reserved maximum, metered actual, pending/disputed usage, taxes when applicable, and available balance. Use an atomic operational balance/hold check before admitting new work; reconcile signed receipts before final debit. Keep Cosmos-derived commitments off the high-frequency purchase/lease path.
4. Do not silently delete a user's data or immediately stop a critical service when prepaid balance reaches zero. Define explicit notice, grace/read-only/export, suspension and recovery rules, with service-class differences and fraud limits. A technical quota and a financial limit should be separate gates.
5. Treat a paid public/business cloud as a **new institutional service offering**, not a mere extension of student lab access. Name seller of record, institutional authority, support and incident ownership, acceptable-use/abuse review, uptime claims, tax/accounting owners and external payment arrangements before accepting money.
6. Require an explicit federation commercial agreement before one institution serves another institution's paid project. Local provider settlement and end-user sale may be different accounting events; neither institution's ledger or pricing should silently become the other's authority.

## Evidence and unresolved decisions

This note proves that candidate open-source consoles and rating components exist and that official authorities publish relevant review criteria. It does **not** prove compatibility with PSDC contracts, legal classification, payment approval, production security, or an implemented paid cloud. Resolve through a prototype and named institutional finance, legal, privacy, security and platform approvals. Preserve the no-course-required product requirement separately from any course-specific grants or budgets.

## Superseded by accepted authority

An approved institution commercial profile, current legislation and regulations,
accepted ADR, released contract and measured deployment evidence supersede this
dated research note wherever they differ.
