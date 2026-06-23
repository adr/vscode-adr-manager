---
status: accepted
date: 2026-06-04
decision-makers: [Naftali Caplan]

---

# Store Technical Credit Annotations in YAML Frontmatter

## Context and Problem Statement

The Track B extension adds Technical Credit (TC) annotations to MADR files — structured metadata that captures the long-term strategic value of an architectural decision. TC annotations need a storage location inside each MADR file so they are version-controlled alongside the decision they describe and remain accessible to both the extension and human readers.

Where should TC annotation fields be stored within a MADR file?

## Decision Drivers

* TC fields must survive a parse → edit → save round-trip without data loss
* TC fields must be readable by humans without tooling
* TC fields must be ignorable by tools that do not understand TC (e.g. standard MADR renderers)
* The storage format must support structured types: strings, enumerations, ordered lists, integers
* The solution must not require changes to the MADR markdown body grammar

## Considered Options

* YAML frontmatter (`tc-*` keys alongside existing `status`, `date`, etc.)
* Sidecar file (e.g. `0001-use-rest.tc.yaml` next to the MADR file)
* Inline HTML comments in the markdown body
* A separate TC registry file per workspace

## Decision Outcome

Chosen option: "YAML frontmatter", because it keeps TC data co-located with the decision, requires no additional file management, and is already supported by the MADR 4.0 schema as an extension point for custom keys.

### Consequences

* Good, because TC fields are version-controlled in the same commit as the decision text
* Good, because YAML is human-readable and editable without the extension
* Good, because tools that do not understand `tc-*` keys skip them without error
* Good, because `js-yaml` can parse and round-trip the frontmatter block without modifying the markdown body grammar
* Bad, because YAML frontmatter grows larger as more TC fields are added, which may reduce readability for files with many fields
* Bad, because TC fields are not validated by the MADR grammar itself — a separate validator (`tc-validator.ts`) is required

### Confirmation

The `parseTcFromYaml` and `serializeTcToYaml` functions in `src/plugins/parser.js` implement the read/write contract. The `tc-schema-version` key is written alongside TC fields to enable future migrations. The `validateTcAnnotation` function in `src/plugins/tc-validator.ts` enforces the schema at the application layer. Round-trip correctness is verified by `src/test/parser.test.ts` and `src/test/real-repo.test.ts`.

## Pros and Cons of the Options

### YAML frontmatter

* Good, because co-located with the decision — no file management overhead
* Good, because MADR 4.0 already uses YAML frontmatter for `status`, `date`, `decision-makers`
* Good, because `tc-*` key prefix namespaces TC fields away from standard MADR keys
* Neutral, because requires `js-yaml` as a runtime dependency (already added)
* Bad, because frontmatter length grows with TC field count

### Sidecar file

* Good, because keeps the MADR file itself clean and standard-compliant
* Bad, because two files must be kept in sync — renaming or deleting the MADR leaves an orphaned sidecar
* Bad, because the extension must manage a parallel file tree
* Bad, because git diffs for a single decision change span two files

### Inline HTML comments

* Good, because invisible in rendered markdown
* Bad, because not machine-parseable without a custom parser
* Bad, because no standard schema or type system for comment-embedded data
* Bad, because invisible to human readers without rendering the source

### Separate TC registry file per workspace

* Good, because all TC data is queryable in one place
* Bad, because TC data is decoupled from the individual decision file — they can drift out of sync
* Bad, because the registry becomes a merge conflict hotspot in team workflows

## More Information

The `tc-schema-version: 1` key written to the frontmatter allows future versions of the extension to detect and migrate older TC schemas without breaking existing files. See the TC Annotations section of `README.md` for the full field reference.
