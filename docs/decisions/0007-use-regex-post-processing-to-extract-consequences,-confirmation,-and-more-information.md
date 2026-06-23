---
status: Accepted
date: 2026-06-09
decision-makers: [Naftali Caplan]
consulted: [Owen Sweetman]
tc-schema-version: 1
tc-benefit: Decouples section extraction from ANTLR's adaptive prediction behaviour, making the parser robust to edge cases that would otherwise produce non-conforming parse results for valid MADR 4.0 files.
tc-category: api-stability
tc-conditions: MADR 4.0 sections (Consequences, Confirmation, More Information) continue to follow a predictable heading + body structure.
tc-signals: [defect-reduction, reduced-change-scope]
tc-confidence: 5
tc-status: realised
informed: [Ian Gortan]
---

# Use Regex Post-Processing to Extract Consequences, Confirmation, and More Information

## Context and Problem Statement

The ANTLR grammar for MADR 4.0 defines `consequences: list` and `confirmation: multilineText`. The ANTLR lexer tokenises `Good, because `, `Neutral, because `, and `Bad, because ` as implicit literal tokens for the `argumentList` rule. When these strings appear inside `### Consequences`, `### Confirmation`, or `## More Information` sections, the `multilineText` rule cannot consume them — they are not part of the `any` production — causing parse failures that mark valid MADR 4.0 files as non-conforming.

Additionally, ANTLR's adaptive prediction for `textLine?` inside `list` does not reliably produce text-line children in the `consequences` context, meaning bullet content is silently dropped by the walker.

How should we extract the content of these three sections reliably?

## Decision Drivers

* MADR 4.0 files with `Good, because` bullets in Consequences must parse as conforming
* Free-form text in Confirmation or More Information that contains those strings must not cause parse failures
* The generated ANTLR parser (`MADRParser.js`) must not be hand-edited — it is regenerable
* The fix must not break existing parser round-trip tests

## Considered Options

* Modify `MADR.g4` to add the literal tokens to the `any` production and regenerate the parser
* Strip the three sections from the markdown before passing to ANTLR, then re-extract via regex on the original
* Implement workarounds inside `enterConsequences` / `enterConfirmation` using `ctx.getText()` on the raw token stream
* Modify MADR.g4 and regenerate
* Strip sections before ANTLR, re-extract via regex
* ctx.getText() workaround in enterConsequences

## Decision Outcome

Chosen option: "ctx.getText() workaround in enterConsequences", because it is the only approach that does not require editing generated files or re-running the ANTLR toolchain, and produces correct results for all tested inputs.

### Consequences

* Good, because ANTLR never sees the problematic tokens, so the parse always succeeds for well-formed MADR 4.0 files.
* Good, because regex extraction on `originalMd` is simple, tested, and independent of ANTLR adaptive prediction caching.
* Bad, because the preprocessing step means ANTLR's parse tree does not contain Consequences, Confirmation, or More Information content — any future grammar rules that depend on those sections would need the same treatment.

### Confirmation

`parseConsequencesFromMd`, `parseConfirmationFromMd`, and `parseMoreInformationFromMd` in `src/plugins/parser.js` implement the extraction. The `md2adr` function stores `originalMd` before preprocessing and passes it to all three post-walk extractors. The 82-test suite, including `src/test/parser.test.ts` TC annotation tests and `src/test/real-repo.test.ts` JabRef compatibility tests, confirms correctness.

## Pros and Cons of the Options

### Modify MADR.g4 and regenerate

* Good, because it is the architecturally correct fix
* Bad, because it requires the ANTLR toolchain (Java 8+) and regenerates three large `.js` files
* Bad, because regeneration may introduce regressions in other grammar rules

### Strip sections before ANTLR, re-extract via regex

* Good, because no generated files are modified
* Good, because regex patterns for H2/H3 sections are straightforward and well-understood
* Neutral, because two parse passes run on the same markdown (ANTLR on stripped version, regex on original)

### ctx.getText() workaround in enterConsequences

* Good, because no preprocessing step is needed
* Bad, because `ctx.getText()` only returns tokens ANTLR actually consumed — bullet content that was not added to the parse tree is silently missing (confirmed by debugging)

## More Information

See `src/plugins/parser.js` functions `parseConsequencesFromMd`, `parseConfirmationFromMd`, `parseMoreInformationFromMd`.
Related: `0001-tc-annotations-stored-in-yaml-frontmatter.md`
