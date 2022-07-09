import { createShortTitle } from "../plugins/utils";
import { naturalCase2snakeCase, snakeCase2naturalCase } from "../plugins/utils";

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
