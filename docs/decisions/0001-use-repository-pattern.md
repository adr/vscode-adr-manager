---
title: Use repository pattern to abstract database access
status: accepted
date: 2025-06-12
decision-makers: [alice, bob]
tc-benefit: Decouples business logic from the database engine, enabling future migration without changes to service layer code.
tc-category: abstraction
tc-conditions: The system outlives the current DB engine, or query performance requirements force a migration.
tc-signals:
  - interface-stability
  - reduced-change-scope
  - no-structural-refactor
tc-signals-note: Check at next major DB version upgrade
tc-confidence: 4
tc-status: anticipated
tc-related: [ADR-0003]
---

# Use repository pattern to abstract database access

## Context and Problem Statement

Service-layer code currently issues SQL queries directly through the ORM, coupling business logic to PostgreSQL specifics. How should we structure data access so that we can change databases or query strategies without rewriting the service layer?

## Considered Options

* Repository pattern with per-aggregate interfaces
* Active Record (status quo)
* Raw query builder shared across services

## Decision Outcome

Chosen option: "Repository pattern with per-aggregate interfaces", because it isolates persistence concerns behind narrow interfaces and is well understood by the team.

### Consequences

* Good, because services become testable without a real database.
* Good, because swapping the underlying store becomes a localised change.
* Bad, because there is an upfront cost to refactor existing call sites.
