---
title: Use PostgreSQL as the primary data store
status: accepted
date: 2024-11-02
decision-makers: [alice]
---

# Use PostgreSQL as the primary data store

## Context and Problem Statement

We need a primary relational data store for the new platform. Which engine should we standardise on?

## Considered Options

* PostgreSQL
* MySQL
* SQLite

## Decision Outcome

Chosen option: "PostgreSQL", because it has the strongest combination of features (JSONB, window functions, row-level security) and operational maturity for our workload.

### Consequences

* Good, because the team has prior production experience with it.
* Bad, because some niche extensions require careful version pinning.
