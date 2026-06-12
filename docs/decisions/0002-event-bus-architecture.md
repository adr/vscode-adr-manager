---
title: Adopt internal event bus for cross-module communication
status: accepted
date: 2025-08-04
decision-makers: [carol]
tc-benefit: Modules communicate through events rather than direct calls, so new modules can subscribe without modifying existing ones.
tc-category: modularity
tc-conditions: New modules continue to be added at the current pace and use cases remain asynchronous-tolerant.
tc-signals:
  - reduced-change-scope
  - no-structural-refactor
tc-confidence: 3
---

# Adopt internal event bus for cross-module communication

## Context and Problem Statement

The number of bounded contexts is growing and direct service-to-service calls are creating a dense dependency graph. Should we introduce an event bus so modules can publish facts and react to others without tight coupling?

## Considered Options

* In-process event bus with typed channels
* Direct service-to-service calls (status quo)
* External message broker (Kafka / RabbitMQ)

## Decision Outcome

Chosen option: "In-process event bus with typed channels", because it removes synchronous coupling without operational overhead of running a broker.

### Consequences

* Good, because modules can be developed and tested in isolation.
* Bad, because debugging async flows requires better tracing.
