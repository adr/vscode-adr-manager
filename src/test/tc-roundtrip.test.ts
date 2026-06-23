// Integration test: a TC annotation survives the real store -> disk -> retrieve
// pipeline (adr2md -> file -> md2adr) for both the basic and professional editors.
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { ArchitecturalDecisionRecord } from "../plugins/classes";
//@ts-ignore - parser is plain JS
import { adr2md, md2adr } from "../plugins/parser.js";

// Mirrors what getAdrObjectFromFields() builds from the webview payload.
function buildAdr(tc: any) {
	return new ArchitecturalDecisionRecord({
		title: "Use Postgres",
		contextAndProblemStatement: "Which database?",
		consideredOptions: [{ title: "Postgres", description: "", pros: [], neutral: [], cons: [] }],
		decisionOutcome: {
			chosenOption: "Postgres",
			explanation: "Mature.",
			consequences: { good: [], bad: [] },
			confirmation: "",
		},
		tc,
	});
}

const sampleTc = {
	benefit: "Decouples service layer from DB engine",
	category: "abstraction",
	conditions: "When we add a second storage backend",
	signals: { tags: ["reduced-change-scope", "interface-stability"], note: "" },
	confidence: 4,
	status: "anticipated",
	related: ["0001-use-orm", "0003-caching"],
};

function writeReadParse(md: string) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tc-"));
	const file = path.join(dir, "test.md");
	fs.writeFileSync(file, md, "utf8");
	const back = md2adr(fs.readFileSync(file, "utf8"));
	fs.rmSync(dir, { recursive: true, force: true });
	return back;
}

describe("TC annotation store/retrieve round-trip", () => {
	test("professional mode persists all TC fields incl. status & related", () => {
		const md = adr2md(buildAdr(sampleTc), "professional");
		const back = writeReadParse(md);
		expect(back.tc).toBeDefined();
		expect(back.tc!.benefit).toBe(sampleTc.benefit);
		expect(back.tc!.category).toBe("abstraction");
		expect(back.tc!.conditions).toBe(sampleTc.conditions);
		expect(back.tc!.signals.tags).toEqual(sampleTc.signals.tags);
		expect(back.tc!.confidence).toBe(4);
		expect(back.tc!.status).toBe("anticipated");
		expect(back.tc!.related).toEqual(sampleTc.related);
	});

	test("basic mode persists core TC fields and strips pro-only fields", () => {
		const md = adr2md(buildAdr(sampleTc), "basic");
		const back = writeReadParse(md);
		expect(back.tc).toBeDefined();
		expect(back.tc!.benefit).toBe(sampleTc.benefit);
		expect(back.tc!.category).toBe("abstraction");
		expect(back.tc!.signals.tags).toEqual(sampleTc.signals.tags);
		expect(back.tc!.confidence).toBe(4);
		// status & related are professional-only -> not written in basic mode
		expect(back.tc!.status).toBeUndefined();
		expect(back.tc!.related).toBeUndefined();
	});

	test("an ADR with no TC annotation produces no tc-* keys", () => {
		const md = adr2md(buildAdr(undefined), "professional");
		expect(md).not.toContain("tc-benefit");
		const back = writeReadParse(md);
		expect(back.tc).toBeUndefined();
	});
});
