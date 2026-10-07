# Minimal Conversation Experience

> Standard: PSDC-DOC-001
> Document type: product-specification
> Status: Normative
> Owner: PSDC Product and Accessibility Maintainers
> Accountable maintainer: RedjiJB until delegation
> Last reviewed: 2026-10-07
> Governing decisions: ADR-0025, ADR-0033

## Purpose, users and outcomes

The default PSDC AI surface is a calm canvas rather than a dashboard or visibly
boxed chat form. The page itself accepts input, renders a semi-transparent local
draft, and progressively reveals controls. Minimalism reduces distraction but
must not conceal privacy, transmission, automation, source or failure state.

Users include students using keyboard, touch, voice, switch control and screen
readers; faculty and staff; and developers/operators using an expanded trace view.

## Scope

The specification owns the AI conversation shell and its visible states. It does
not own model behavior, tool authorization, institutional identity, content
policy or the underlying design-system implementation.

## Included, excluded and deferred capabilities

Included are local draft echo, explicit submit, streamed response, clarification,
sources, cancel/undo, privacy state, pacing, history, accessible conventional
input fallback and developer mode. Autonomous action approval remains in the
Agent Approval UX. Institution branding is an overlay. Emotion detection,
keystroke profiling and manipulative engagement are prohibited. Rich multi-agent
visualization is deferred.

## Interaction model

```text
blank/calm -> composing-local -> submitted -> routing
                                -> responding-fast
                                -> deliberating + responding-fast
                                -> response-ready -> presenting
                                -> degraded | denied | failed | cancelled
```

The visual surface MUST always have an accessible semantic input, even if its
border is visually absent. A visible state glyph and screen-reader announcement
identify local-only, transmitting, deliberating, tool use, ready, degraded and
failed states.

## Requirements

- `UX-MIN-001`: Draft text MUST remain readable, editable and local by default; opacity MUST meet the user's contrast setting.
- `UX-MIN-002`: Submit, cancel, undo, source access and privacy state MUST be reachable by keyboard and assistive technology.
- `UX-MIN-003`: The client MUST distinguish model generation from deliberate presentation pacing.
- `UX-MIN-004`: Users MUST be able to reveal an available response immediately, pause pacing and disable animation.
- `UX-MIN-005`: Minimal mode MUST NOT hide consequential action, memory, tool, data-access or consent state.
- `UX-MIN-006`: A conventional labelled text-entry mode MUST be available without loss of function.
- `UX-MIN-007`: Developer mode MUST be permission-scoped and MUST NOT display hidden chain-of-thought, secrets or unauthorized content.

## Privacy, consent and telemetry

Default composition generates no remote event. Product telemetry records state
transitions and performance with pseudonymous identifiers and no draft content.
Anticipatory mode uses the separate Typing and Draft Privacy policy. Memory and
long-term personalization are explicit controls, not consequences of using chat.

## Responsive, offline and degraded behavior

Local composition, history explicitly cached for offline use, and accessibility
preferences remain available during outage. The client reports that submission is
offline; it does not silently queue protected drafts unless the user chooses that
behavior. Degradation names the available model/capability and limitations.

## Accessibility

The experience targets WCAG 2.2 AA, preserves semantic labels and focus order,
supports zoom, high contrast, reduced motion and screen readers, and provides a
conventional visible input when the canvas interaction is unsuitable.

## Developer mode

The expanded view may show trace ID, route decision, model aliases, queue/TTFT,
context generation and expiry, evidence references, tool calls, policy outcomes,
cache class/hit, compute class, retry and receipt. It shows concise rationale and
state transitions, not private reasoning tokens.

## Acceptance scenarios

- `UX-MIN-ACC-001`: a keyboard-only user completes compose, submit, cancel, source and pacing journeys.
- `UX-MIN-ACC-002`: screen readers announce every state without relying on icon shape or color.
- `UX-MIN-ACC-003`: network capture proves default draft composition is local.
- `UX-MIN-ACC-004`: response-ready plus slow presentation exposes immediate reveal.
- `UX-MIN-ACC-005`: developer mode redaction tests prevent prompt, secret and cross-user disclosure.
- `UX-MIN-ACC-006`: loss of JavaScript enhancement leaves an understandable error and recovery path.

## Dependencies and release evidence

`psdc-web` owns the browser implementation; desktop and mobile implement the same
states through shared contracts. Release evidence includes WCAG 2.2 AA audit,
keyboard/screen-reader/reduced-motion tests, privacy network capture, browser
security tests, state-machine tests and institution-brand overlay tests.

## References

- [Typing and Draft Privacy](../governance/Typing-and-Draft-Privacy.md)
- [Developer Observability Mode](./Developer-Observability-Mode.md)
- [Accessibility](../clients/Accessibility.md)
