# ADR-0006: Thin, Upstream-Compatible Product Forks

> Status: Accepted
> Scope: Adopted user-facing and federated products

## Context

Branding, SSO, model catalogs, tools, and Algonquin integrations provide value;
rewriting mature products or allowing a fork to drift indefinitely does not.

## Decision

Eligible OSI-licensed clients, including OpenCode, remain thin downstream forks or
extension layers. The same upstream-first rule applies to adopted Fediverse and
other products. Changes use supported configuration or plugin surfaces first, are
proposed upstream when generally useful, and carry a measured patch budget when
maintained downstream.

ADR-0008 adds a mandatory license gate. Open WebUI v0.6.6 and later is not an
eligible dependency because its branding restriction is not OSI-approved. It may
be treated as a protocol-compatibility target. ADR-0009 selects its BSD-3-Clause
v0.6.5 source as the preferred, gated bootstrap for Algonquin AI Web. That source
is a frozen foundation for independent development, not a moving upstream.

## Consequences

- Security and feature updates remain mergeable.
- Every downstream patch needs an owner, rationale, compatibility test, and removal
  or upstream plan.
- Deep visual or architectural divergence requires an ADR and lifecycle funding.
- A license change automatically suspends adoption or upgrade until the new terms
  pass the open-source admission test.
