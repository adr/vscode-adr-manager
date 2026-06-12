---
title: Introduce feature flag system for safe rollouts
status: accepted
date: 2025-09-20
decision-makers: [dave, eve]
tc-benefit: Enables progressive rollout, A/B testing, and quick rollback of risky changes without redeploying.
tc-category: configurability
tc-conditions: Flags are short-lived and pruned regularly; flag evaluation latency stays under 10ms.
tc-signals:
  - faster-feature-delivery
  - defect-reduction
  - reuse-observed
tc-signals-note: Three teams already use the flag SDK in production.
tc-confidence: 5
tc-status: realised
tc-related: [ADR-0001, ADR-0002]
---

# Introduce feature flag system for safe rollouts

## Context and Problem Statement

Production incidents from risky deploys are increasing. We need a way to ship code dark, target specific cohorts, and roll back instantly without a redeploy.

## Considered Options

* In-house feature flag service backed by Redis
* Third-party SaaS (LaunchDarkly)
* Per-service config files (status quo)

## Decision Outcome

Chosen option: "In-house feature flag service backed by Redis", because we have the platform team to maintain it and the cost of a SaaS at our scale exceeds engineering effort.

### Consequences

* Good, because rollout decisions move from release to runtime.
* Good, because the flag SDK is reusable across services.
* Bad, because the platform team owns another component.
