# Academic Provider Contract

> Status: Normative architecture contract
> Governing decisions: ADR-0007, ADR-0008, ADR-0010

## Purpose

Give clients, agents, and knowledge services one stable Academic Service without
embedding Brightspace or another LMS throughout the platform.

## Provider boundary

```text
clients and agents
        |
Internal Academic Service
        |
AcademicProvider contract
        |
Brightspace | local/test | future College-approved provider
```

## Minimum normalized resources

- `Course`: stable internal ID, approved course code/title, term and lifecycle;
- `Membership`: subject reference, course reference and normalized role;
- `ContentItem`: course, title, type, source provenance and authorization context;
- `Assignment`: course, title, availability, due date and submission capability;
- `Announcement`: course, publication interval and content reference;
- `AcademicAction`: requested operation, risk tier, preview, confirmation and
  receipt.

Provider terms such as Brightspace `OrgUnit`, raw provider IDs, OAuth tokens, and
vendor errors terminate at the adapter.

## Initial operations

```text
list_courses(subject, term)
get_course(subject, course_id)
list_content(subject, course_id)
list_assignments(subject, course_id)
list_deadlines(subject, range)
list_announcements(subject, course_id)
```

The initial production scope is read-only. Write operations are separate
versioned capabilities and require policy, preview, confirmation, verification,
idempotency, and a receipt.

## Implementations

- **Production institutional academic features:** the institution-approved LMS
  API, OAuth and/or LTI 1.3 adapter selected by use case; Algonquin's local fork
  may select Brightspace without making it a common dependency.
- **Development/CI:** deterministic synthetic fixtures or a local provider with no
  production College data.
- **Future:** another College-approved LMS adapter conforming to the same contract.

## Failure contract

Provider failure disables or degrades only the academic capability needing
authoritative data. General AI and unrelated platform functions remain available.
Clients receive normalized availability and retry information, never raw provider
errors or credentials.

## Security and data rules

- enforce the requesting person's current course authorization;
- minimize ingestion and preserve source/course provenance;
- apply course lifecycle retention and deletion;
- never scrape pages or impersonate user credentials;
- prevent development fixtures from being confused with authoritative records;
- test adapters separately from provider-independent contract tests.
