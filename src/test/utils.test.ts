import { createShortTitle } from "../plugins/utils";
import { naturalCase2snakeCase, snakeCase2naturalCase } from "../plugins/utils";
import { matchesMadrTitleFormat } from "../plugins/utils";

describe("Creating Short Title Function Test", () => {
	test("Markdown link followed by text", () => {
		expect(
			createShortTitle("[MADR](https://adr.github.io/madr/) 2.1.2 – The Markdown Architectural Decision Records")
		).toBe("MADR 2.1.2");
	});

	test("Markdown link preceded by text", () => {
		expect(createShortTitle("Include in [adr-tools](https://github.com/npryce/adr-tools)")).toBe(
			"Include in adr-tools"
		);
	});

	test("Wrong balancing of brackets", () => {
		expect(createShortTitle("Include in [adr-tools](https://github.com/npryce/adr-tools")).toBe(
			"Include in [adr-tools](https://github.com/npryce/adr-tools"
		);
	});

	test("Single closing brace", () => {
		expect(createShortTitle("Con. Opt 1)")).toBe("Con. Opt 1)");
	});
});

describe("Change Casings Tests", () => {
	/**
	 * Tests of the utility functions snakeCase2naturalCase and naturalCase2snakeCase
	 */
	test("Test snakeCase2naturalCase", () => {
		let result = snakeCase2naturalCase("0005-use-dashes-in-file-names.md");
		expect(result).toBe("0005 Use Dashes In File Names.md");
	});

	test("Test naturalCase2snakeCase", () => {
		let result = naturalCase2snakeCase("0005 Use dashes in File names.md");
		expect(result).toBe("0005-use-dashes-in-file-names.md");
	});
});

describe("Test MADR Title Format Match", () => {
	test("Valid MADR titles", () => {
		let validTitles = [
			"0000-use-markdown-architectural-records.md",
			"0001-use-vue.js.md",
			"0002-use-antlr-for-parsing-adrs.md",
			"0003-use-rollup-to-bundle-webviews.md",
			"0004-example-madr-title.md",
		];
		validTitles.forEach((title) => {
			let result = matchesMadrTitleFormat(title);
			expect(result).toBeTruthy();
		});
	});

	test("Invalid MADR titles", () => {
		let invalidTitles = [
			"001-only-three-numbers-at-the-start.md",
			"0002-Uppercase-Title.md",
			"0003-not-ending-in-md.txt",
			"0004-dash-in-the-end-.md",
			"0005_underscores_instead_of_dashes.md",
		];

		invalidTitles.forEach((title) => {
			let result = matchesMadrTitleFormat(title);
			expect(result).toBeFalsy();
		});
	});
});
