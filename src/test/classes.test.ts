import "mocha";
import { expect } from "chai";
import { createShortTitle } from "../plugins/utils";

describe("Creating Short Title", () => {
	it("Markdown link followed by text", () => {
		expect(
			createShortTitle("[MADR](https://adr.github.io/madr/) 2.1.2 – The Markdown Architectural Decision Records")
		).to.be.equal("MADR 2.1.2");
	});

	it("Markdown link preceded by text", () => {
		expect(createShortTitle("Include in [adr-tools](https://github.com/npryce/adr-tools)")).to.be.equal(
			"Include in adr-tools"
		);
	});

	it("Wrong balancing of brackets", () => {
		expect(createShortTitle("Include in [adr-tools](https://github.com/npryce/adr-tools")).to.be.equal(
			"Include in [adr-tools](https://github.com/npryce/adr-tools"
		);
	});

	it("Single closing brace", () => {
		expect(createShortTitle("Con. Opt 1)")).to.be.equal("Con. Opt 1)");
	});
});
