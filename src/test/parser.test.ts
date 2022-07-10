// Tested functionality
import { md2adr, adr2md } from "../plugins/parser.js";

// Needed for testing
import { randomStrings, MD_ParsedMADR_Pairs, validMarkdownADRs } from "./constants";

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

/**
 * Precision for valid ADRs:
 * The output of the parser should be equal to the input ADR. This only holds for valid MADRs.
 */
for (let i = 0; i < validMarkdownADRs.length; i++) {
	test("Test exact reparsing", async () => {
		let result = adr2md(await md2adr(validMarkdownADRs[i]));
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
