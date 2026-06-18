// Tested functionality
import { md2adr, adr2md } from "../plugins/parser.js";

// Needed for testing
import { randomStrings, MD_ParsedMADR_Pairs, validMarkdownADRs, yamlMADRs } from "./constants";

/**
 * Convergence of the parser:
 * The output of the parser must always be accepted by the parser.
 */
for (let i = 0; i < randomStrings.length; i++) {
	test("Test parser convergence of random strings.", () => {
		let result1 = adr2md(md2adr(randomStrings[i]));
		let result2 = adr2md(md2adr(result1));
		expect(result2).toBe(result1);
	});
}

for (let i = 0; i < MD_ParsedMADR_Pairs.length; i++) {
	test("Test parser convergence of possibly incorrect ADRs.", () => {
		let result1 = adr2md(md2adr(MD_ParsedMADR_Pairs[i].md));
		let result2 = adr2md(md2adr(result1));
		expect(result2).toBe(result1);
	});
}

// MADRs with YAML Front Matter:
for (let i = 0; i < yamlMADRs.length; i++) {
	test("Test parser convergence of ADRs with YAML Front Matter.", () => {
		let result1 = adr2md(md2adr(yamlMADRs[i]));
		let result2 = adr2md(md2adr(result1));
		expect(result2).toBe(result1);
	});
}

/**
 * Precision for valid ADRs:
 * The output of the parser should be equal to the input ADR. This only holds for valid MADRs.
 */
for (let i = 0; i < validMarkdownADRs.length; i++) {
	test("Test exact reparsing", () => {
		let result = adr2md(md2adr(validMarkdownADRs[i]));
		expect(result).toBe(validMarkdownADRs[i]);
	});
}

/**
 * Test of the function md2adr.
 * Compares some parsed ADRs to manually parsed ADRs.
 */
MD_ParsedMADR_Pairs.forEach(function (pair) {
	test("Test md2adr", () => {
		let result = md2adr(pair.md);
		expect(result).toStrictEqual(pair.adr);
	});
});

// ─── TC Annotation Tests ───────────────────────────────────────────────────

const TC_MADR = `---
title: Use Repository Pattern for Data Access
tc-benefit: Decouples service layer from DB engine
tc-category: abstraction
tc-conditions: System outlives current DB or perf requires migration
tc-signals:
  - interface-stability
  - reduced-change-scope
tc-confidence: 4
tc-status: anticipated
tc-related:
  - ADR-003
---

# Use Repository Pattern for Data Access

## Decision Outcome

Chosen option: "Repository Pattern", because it isolates persistence logic.
`;

const TC_MADR_CORE_ONLY = `---
title: Use Repository Pattern for Data Access
tc-benefit: Decouples service layer from DB engine
tc-category: abstraction
tc-conditions: System outlives current DB or perf requires migration
tc-signals:
  - interface-stability
tc-confidence: 3
---

# Use Repository Pattern for Data Access

## Decision Outcome

Chosen option: "Repository Pattern"
`;

const NO_TC_MADR = `# Use PostgreSQL

## Decision Outcome

Chosen option: "PostgreSQL", because it meets our reliability requirements.
`;

describe("TC annotation — parsing", () => {
	test("parses all 6 TC fields from YAML frontmatter", () => {
		const adr = md2adr(TC_MADR);
		expect(adr.tc).toBeDefined();
		expect(adr.tc!.benefit).toBe("Decouples service layer from DB engine");
		expect(adr.tc!.category).toBe("abstraction");
		expect(adr.tc!.conditions).toBe("System outlives current DB or perf requires migration");
		expect(adr.tc!.signals.tags).toEqual(["interface-stability", "reduced-change-scope"]);
		expect(adr.tc!.confidence).toBe(4);
		expect(adr.tc!.status).toBe("anticipated");
		expect(adr.tc!.related).toEqual(["ADR-003"]);
	});

	test("parses core-only TC fields, leaving pro fields undefined", () => {
		const adr = md2adr(TC_MADR_CORE_ONLY);
		expect(adr.tc).toBeDefined();
		expect(adr.tc!.confidence).toBe(3);
		expect(adr.tc!.status).toBeUndefined();
		expect(adr.tc!.related).toBeUndefined();
	});

	test("leaves adr.tc undefined when no TC fields present", () => {
		const adr = md2adr(NO_TC_MADR);
		expect(adr.tc).toBeUndefined();
	});
});

describe("TC annotation — edge cases", () => {
	test("partial TC fields: only benefit present, others absent — adr.tc defined, no crash", () => {
		const md = `---
tc-benefit: Some benefit
---

# Partial ADR

## Decision Outcome

Chosen option: "Option A"
`;
		const adr = md2adr(md);
		expect(adr.tc).toBeDefined();
		expect(adr.tc!.benefit).toBe("Some benefit");
		expect(adr.tc!.category).toBeUndefined();
		expect(adr.tc!.conditions).toBe("");
		expect(adr.tc!.confidence).toBeUndefined();
		expect(adr.tc!.signals.tags).toEqual([]);
	});

	test("unknown enum value in tc-category passes through without throwing", () => {
		const md = `---
tc-benefit: Some benefit
tc-category: something-made-up
tc-confidence: 3
---

# ADR

## Decision Outcome

Chosen option: "Option A"
`;
		expect(() => md2adr(md)).not.toThrow();
		const adr = md2adr(md);
		expect(adr.tc!.category).toBe("something-made-up");
	});

	test("basic mode serialise does not write tc-status or tc-related", () => {
		const adr = md2adr(TC_MADR);
		const result = adr2md(adr, 'basic');
		expect(result).not.toContain("tc-status");
		expect(result).not.toContain("tc-related");
		expect(result).toContain("tc-benefit");
	});

	test("professional mode serialise writes tc-status and tc-related", () => {
		const adr = md2adr(TC_MADR);
		const result = adr2md(adr, 'professional');
		expect(result).toContain("tc-status");
		expect(result).toContain("tc-related");
	});
});

describe("TC annotation — round-trip", () => {
	test("TC fields survive a full parse → serialise → re-parse cycle", () => {
		const adr1 = md2adr(TC_MADR);
		const adr2 = md2adr(adr2md(adr1));
		expect(adr2.tc).toEqual(adr1.tc);
	});

	test("MADR with no TC fields round-trips without gaining tc keys", () => {
		const result = adr2md(md2adr(NO_TC_MADR));
		expect(result).not.toContain("tc-");
	});

	test("removing adr.tc strips all tc- keys from serialised YAML", () => {
		const adr = md2adr(TC_MADR);
		adr.tc = undefined;
		const result = adr2md(adr);
		expect(result).not.toContain("tc-");
	});
});
