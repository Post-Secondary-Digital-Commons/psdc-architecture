# AI Contract Profile

> Status: Normative contract profile, version 1

Clients use the Commons AI Gateway. The portable surface follows OpenAI-compatible
chat, response, embedding, model-list and streaming semantics where those
semantics fit. Native v1 operations add model aliases, capability discovery,
classification-aware routing, policy decisions, tool registration, confirmation,
usage, citations, evaluation metadata and action receipts without leaking provider
credentials or runtime-specific identifiers.

Every request carries institution, subject, purpose, data classification, model
alias, policy version, request ID, limits and optional idempotency key. Streaming
events carry sequence, type, timestamp and terminal status. Errors use the common
problem profile and distinguish policy denial, capacity, model availability,
invalid tool, context limit, timeout, cancellation and upstream failure.

Direct client-to-provider access is prohibited. Implementations pass compatibility,
authorization, quota, cancellation, fallback, prompt-injection, tool-confirmation,
data-routing, usage and provider-substitution tests.
