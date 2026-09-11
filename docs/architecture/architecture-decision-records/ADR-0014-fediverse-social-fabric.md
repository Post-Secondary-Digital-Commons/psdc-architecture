# ADR-0014: The Social Fabric Is Fediverse- and ActivityPub-Based

> Status: Accepted
> Date: 2026-09-10
> Scope: Social, photos, video, communities, blogs, live media, and inter-campus collaboration

## Decision

Every institution operates its own governed social node or suite. Cross-campus,
provincial, Canadian, and public social interoperability uses ActivityPub and
related Fediverse standards rather than a proprietary social protocol or shared
central social database.

Algonquin-specific value belongs in institutional affiliation, local discovery,
clubs, courses, events, moderation, policy, accessibility, student-life agents,
media/spatial integration, and coherent UX. Mature open-source Fediverse products
are adopted or extended behind shared contracts.

Institutional identity and public Fediverse identity remain distinct. Verified
affiliation is an explicit, revocable claim; it does not expose private
institutional identity data to federation peers.

## Consequences

- AC Fediverse remains the sole external ActivityPub boundary.
- Other fabrics publish through internal contracts rather than implementing
  federation independently.
- Federation trust and moderation operate at institution, consortium, and public
  levels with different policies.
- Compatibility and abuse-resistance testing precede public federation.

