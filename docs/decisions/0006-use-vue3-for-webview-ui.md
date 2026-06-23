---
status: accepted
date: 2026-05-28
decision-makers: [Owen Sweetman, Naftali Caplan]
consulted: [Steven Chen]
informed: [Cesca, Maddy, Sukira]
tc-schema-version: 1
tc-benefit: Vue 3's reactive data model keeps form state in sync with the ADR data model without manual DOM manipulation, reducing the maintenance cost of the webview layer as the MADR schema evolves.
tc-category: modularity
tc-conditions: The webview continues to use a component-based architecture and the team does not migrate to a different framework.
tc-signals:
  - reduced-change-scope
  - interface-stability
tc-confidence: 4
---

# Use Vue 3 for Webview UI Components

## Context and Problem Statement

The extension uses VS Code's webview API to render interactive forms for creating and editing MADR 4.0 ADRs. The webview is a sandboxed HTML page that communicates with the extension host via message passing. We need a UI framework that can manage complex form state (options, pros/cons, TC annotation fields) without introducing excessive boilerplate.

## Decision Drivers

* Form state must stay in sync with the MADR data model across basic and professional editor modes
* Component reuse across Add/View/Edit webviews reduces duplication
* Framework must bundle cleanly with rollup for the packaged `.vsix`
* Minimal runtime footprint — the webview loads inside VS Code

## Considered Options

* Vue 3 with the Options API and rollup bundler
* React with webpack
* Vanilla JavaScript with manual DOM manipulation
* Svelte

## Decision Outcome

Chosen option: "Vue 3 with the Options API and rollup bundler", because it offers reactive two-way data binding, a clean component model, and straightforward rollup integration without the overhead of a full application framework.

### Consequences

* Good, because reactive `v-model` bindings eliminate manual DOM synchronisation for all form fields.
* Good, because single-file components (`.vue`) co-locate template, logic, and scoped styles, making each form section self-contained.
* Bad, because Vue's production build applies scoped CSS attribute hashing, which can cause subtle differences between dev and release behaviour for third-party library interactions (e.g. drag handles).

### Confirmation

The rollup config at `rollup.config.js` targets Vue 3 and produces separate bundles per webview page (`add-basic`, `add-professional`, `view-basic`, `view-professional`). All form components in `web/components/` use the Options API with `adr-data.ts` and `save-adr.ts` mixins for shared state.

## Pros and Cons of the Options

### Vue 3 with the Options API and rollup bundler

* Good, because two-way binding with `v-model` handles all form inputs including nested objects
* Good, because rollup tree-shakes the Vue runtime to a small bundle (~50 KB gzipped)
* Neutral, because the Options API requires mixins for shared state rather than composables, which is less idiomatic in Vue 3 but familiar to the existing codebase

### React with webpack

* Good, because large ecosystem and strong TypeScript support
* Bad, because webpack bundle size is larger and configuration is more complex for multi-page webviews
* Bad, because React's unidirectional data flow requires more boilerplate for deeply nested form state

### Vanilla JavaScript with manual DOM manipulation

* Good, because zero framework overhead
* Bad, because manual DOM updates for 20+ reactive form fields would be error-prone and hard to maintain

### Svelte

* Good, because compiles to minimal vanilla JS with no runtime
* Bad, because smaller ecosystem and less rollup plugin support at time of decision

## More Information

Vue 3 migration guide: https://v3-migration.vuejs.org/
Related: see `web/mixins/adr-data.ts` and `web/mixins/save-adr.ts` for the shared mixin approach.
