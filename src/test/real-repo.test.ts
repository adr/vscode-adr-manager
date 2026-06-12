/**
 * Real-repo compatibility tests using actual JabRef ADR files.
 * Verifies that our TC layer does not crash or corrupt existing MADR files
 * that have no TC annotations.
 */
import { md2adr, adr2md } from "../plugins/parser.js";

// JabRef 0001 — no YAML, simple MADR 2.x format
const JABREF_0001 = `# Use Crowdin for translations

## Context and Problem Statement

The JabRef UI is offered in multiple languages. It should be easy for translators to translate the strings.

## Considered Options

* Use [Crowdin](http://crowdin.com/)
* Use [popeye](https://github.com/JabRef/popeye)
* Use [Lingohub](https://lingohub.com/)
* Keep current GitHub flow. See the [Step-by-step guide](https://docs.jabref.org/contributing/how-to-translate-the-ui).

## Decision Outcome

Chosen option: "Use Crowdin", because Crowdin is easy to use, integrates in our GitHub workflow, and is free for OSS projects.
`;

// JabRef 0027 — YAML with non-TC keys, MADR 4.0-style Good/Bad bullets
const JABREF_0027 = `---
nav_order: 27
parent: Decision Records
---

# Synchronization with remote databases

## Context and Problem Statement

Synchronize the data in a library to a remote database, while handling conflicts and supporting offline-first paradigm.

## Decision Drivers

- Updates from the remote should be pulled in
- No updates should get lost

## Considered Options

- "Optimistic offline lock" with hashes for local file support
- Algorithm based on "optimistic offline lock"
- Use CRDTs

## Decision Outcome

Chosen option: "'Optimistic offline lock' with hashes for local file support", because simplest option to resolves all forces.

## Pros and Cons of the Options

### Algorithm based on "optimistic offline lock"

- Good, because this algorithm is already in place since 2016.
- Bad, because it assumes the client to be online 100%.

### Use CRDTs

- Bad, because one needs to locally store a lot more metadata.
- Bad, because CRDTs are mainly used when you need low latency.
`;

// MADR with non-TC YAML keys only — TC fields must not appear after round-trip
const NON_TC_YAML = `---
nav_order: 5
parent: Decision Records
status: accepted
date: 2024-01-15
---

# Use PostgreSQL as primary database

## Decision Outcome

Chosen option: "PostgreSQL", because it meets all requirements.
`;

describe("Real-repo compatibility — no TC fields", () => {
	test("JabRef 0001 (no YAML): parses without crash, adr.tc is undefined", () => {
		expect(() => md2adr(JABREF_0001)).not.toThrow();
		const adr = md2adr(JABREF_0001);
		expect(adr.tc).toBeUndefined();
	});

	test("JabRef 0001: round-trips without gaining tc- keys", () => {
		const result = adr2md(md2adr(JABREF_0001));
		expect(result).not.toContain("tc-");
	});

	test("JabRef 0027 (non-TC YAML): parses without crash, adr.tc is undefined", () => {
		expect(() => md2adr(JABREF_0027)).not.toThrow();
		const adr = md2adr(JABREF_0027);
		expect(adr.tc).toBeUndefined();
	});

	test("JabRef 0027: round-trips without gaining tc- keys", () => {
		const result = adr2md(md2adr(JABREF_0027));
		expect(result).not.toContain("tc-");
	});

	test("non-TC YAML keys are preserved through round-trip", () => {
		const adr = md2adr(NON_TC_YAML);
		expect(adr.tc).toBeUndefined();
		const result = adr2md(adr);
		expect(result).toContain("nav_order");
		expect(result).toContain("parent");
		expect(result).not.toContain("tc-schema-version");
	});
});

describe("Real-repo compatibility — tc-schema-version", () => {
	test("tc-schema-version: 1 is written when TC fields are added to an existing file", () => {
		const adr = md2adr(JABREF_0001);
		adr.tc = {
			benefit: "Decouples translation logic",
			category: "modularity",
			conditions: "Project grows beyond single language",
			signals: { tags: ["interface-stability"] },
			confidence: 3,
		};
		const result = adr2md(adr, 'professional');
		expect(result).toContain("tc-schema-version: 1");
	});

	test("tc-schema-version is removed when TC annotation is cleared", () => {
		const adr = md2adr(JABREF_0001);
		adr.tc = {
			benefit: "Some benefit",
			category: "abstraction",
			conditions: "Some conditions",
			signals: { tags: [] },
			confidence: 2,
		};
		const withTc = adr2md(adr);
		expect(withTc).toContain("tc-schema-version");

		const adr2 = md2adr(withTc);
		adr2.tc = undefined;
		const withoutTc = adr2md(adr2);
		expect(withoutTc).not.toContain("tc-schema-version");
		expect(withoutTc).not.toContain("tc-");
	});
});
