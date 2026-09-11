# Post-Secondary Digital Commons Funding Model

> Status: Accepted planning assumption; external approval required
> Date: 2026-09-10
> Governing decision: ADR-0015

## Accepted assumption

Use **CA$30 per participating student per enrolled month** as the common planning
input. This equals CA$120 for a four-month term and CA$240 for two four-month
terms. It is a gross capacity-planning assumption, not an approved student fee,
revenue commitment, profit forecast, procurement authority, or promise of service.

## Reproducible formulas

```text
gross_monthly_funding = participating_students × enrolled_months_in_month × CA$30
gross_term_funding    = participating_students × 4 × CA$30
gross_two_term_year   = participating_students × 8 × CA$30
```

| Participating students | One enrolled month | Four-month term | Two-term year |
|---:|---:|---:|---:|
| 500 | CA$15,000 | CA$60,000 | CA$120,000 |
| 1,000 | CA$30,000 | CA$120,000 | CA$240,000 |
| 5,000 | CA$150,000 | CA$600,000 | CA$1,200,000 |
| 10,000 | CA$300,000 | CA$1,200,000 | CA$2,400,000 |
| 25,000 | CA$750,000 | CA$3,000,000 | CA$6,000,000 |
| 50,000 | CA$1,500,000 | CA$6,000,000 | CA$12,000,000 |
| 100,000 | CA$3,000,000 | CA$12,000,000 | CA$24,000,000 |

Scenarios are arithmetic examples only. Actual participation, eligible months,
collections, exemptions, taxes, transfers and costs require validated inputs.

## Allocation categories

Every approved budget identifies amounts for:

- people, support, accessibility and training;
- security, privacy, legal, audit and compliance;
- infrastructure acquisition, facilities, power, network and lifecycle renewal;
- platform development, maintenance, upstream contribution and release engineering;
- backup, disaster recovery, observability and incident response;
- grants, teaching, research and student innovation;
- federation operations, conformance and shared services;
- contingency and long-term sustainability.

No exact percentage split is accepted yet. It must follow measured operating costs,
governance goals and the applicable public-sector approval process.

## Economic safeguards

- Keep gross funding, operating expense, capital expense, avoided cost, reserves
  and restricted funds separate.
- Never count opportunistic campus compute as available capacity or savings before
  a hardware census, utilization measurement, eligibility analysis and pilot.
- Student and institutional workloads retain priority over contributed spare
  compute; preemption and compensation policies are explicit.
- Federation contributions and consumption use an auditable resource ledger with
  dispute, reconciliation and exit procedures.
- Procurement and architecture preserve data portability and avoid vendor lock-in.
- Equity, hardship, opt-out, program eligibility and accessibility impacts require
  human governance before any charge or allocation model is implemented.

## Approval gates

Before this assumption becomes an operating program, name accountable owners and
obtain required student, academic, finance, legal, privacy, security, accessibility,
procurement, institutional and government approvals. Publish the approved service
scope, budget, measurement rules, audit method, complaint path and annual review.
