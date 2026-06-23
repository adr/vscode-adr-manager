# Project Context — TC-ADR Manager (Track B)

**Author:** Naftali Caplan (Northeastern University)
**Programme:** Technical Credit Summer School, Sydney 2026
**Track:** Track B — Tooling for Technical Credit capture and communication

---

## Why are we doing this?

Software teams make hundreds of architectural decisions, but rarely write them down in a way that captures *why* a decision was valuable — not just what was decided. When context is lost, teams can't tell whether a past decision is still paying off, quietly decaying, or actively causing harm. This is the problem of **Technical Credit**: the positive counterpart to technical debt — structural investments in code or architecture that make future work easier, cheaper, or safer.

The challenge is that Technical Credit is invisible. There is no standard way to express it, and no tooling that makes capturing it feel like a natural part of the development workflow. Most ADR tools stop at recording the decision. None ask: *what long-term value does this create, and how will you know if it's being realised?*

---

## What are we starting from?

This project is built on top of the open-source [ADR Manager](https://github.com/adr/adr-manager) VS Code extension (original author: Steven Chen, University of Stuttgart). That extension provides a webview UI for creating and editing ADRs in the MADR 2.x format.

Track B's starting point was a fork of that extension with:
- A grammar and parser for MADR 4.0 (updated format with YAML frontmatter and new sections)
- A basic TC annotation schema (`tc-*` YAML keys) defined by the summer school research team
- An early TC Dashboard sidebar

The MADR 4.0 parser was functional but incomplete — fields such as `date`, `decision-makers`, `consulted`, `informed`, `confirmation`, and `consequences` were either not serialised correctly or were lost on save. The TC Dashboard had no live refresh and categorised nothing beyond the simplest cases.

---

## Overall Aim and Research Questions

The goal of Track B is to answer:

> **RQ1: Can a lightweight VS Code extension make Technical Credit capture a natural part of writing Architectural Decision Records?**

> **RQ2: Does surfacing TC annotations at the point of decision-writing (rather than in a separate tool) improve the completeness and consistency of TC data recorded by practitioners?**

To address these, this project:

1. **Completes the MADR 4.0 editor** — all frontmatter fields (`status`, `date`, `decision-makers`, `consulted`, `informed`), all body sections (`Consequences`, `Confirmation`, `More Information`), and all TC annotation fields are correctly persisted through every edit path (basic mode, professional mode, mode switches, create, save, reload).

2. **Robustifies the parser** — replaces a fragile hand-rolled YAML parser with `js-yaml` (CORE_SCHEMA), bypasses ANTLR grammar limitations for sections that conflict with reserved tokens, and ensures clean round-trip serialisation.

3. **Makes the TC Dashboard useful** — immediate refresh on save, correct categorisation of annotated-but-uncategorised ADRs, and confidence visualisation for each TC claim.

4. **Packages and publishes the extension to the VS Code Marketplace** — so it can be installed and evaluated by real practitioners in a user study.

The user study (Track A's responsibility) asks participants to write ADRs with and without the extension. Track B's tooling is the instrument; the research question is whether the annotation fields it surfaces change what practitioners choose to record.

---

## Scope

This repo contains:
- The VS Code extension source (`src/`, `web/`)
- MADR 4.0 grammar and parser (`src/plugins/parser/`, `src/plugins/parser.js`)
- TC annotation schema and validator (`src/plugins/tc-validator.ts`)
- TC Dashboard provider (`src/TcDashboardProvider.ts`)
- Evaluation materials used in the user study (`docs/evaluation/`)
- Example annotated ADRs (`docs/decisions/`)

The extension is published on the VS Code Marketplace as **TC-ADR Manager** by `NaftaliCaplan`.
