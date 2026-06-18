import { validateTcAnnotation } from "../plugins/tc-validator";
import { TcAnnotation } from "../plugins/tc-types";

const VALID_TC: TcAnnotation = {
	benefit: "Decouples service layer from DB engine",
	category: "abstraction",
	conditions: "System outlives current DB or perf requires migration",
	signals: { tags: ["interface-stability", "reduced-change-scope"] },
	confidence: 4,
};

describe("validateTcAnnotation — valid input", () => {
	test("returns no errors for a fully valid core annotation", () => {
		expect(validateTcAnnotation(VALID_TC)).toEqual([]);
	});

	test("returns no errors when optional pro fields are present and valid", () => {
		const tc: TcAnnotation = { ...VALID_TC, status: "anticipated", related: ["ADR-003"] };
		expect(validateTcAnnotation(tc)).toEqual([]);
	});

	test("returns no errors when pro fields are absent", () => {
		const tc: TcAnnotation = { ...VALID_TC };
		expect(validateTcAnnotation(tc)).toEqual([]);
	});
});

describe("validateTcAnnotation — benefit", () => {
	test("error when benefit is empty string", () => {
		const tc = { ...VALID_TC, benefit: "" };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "benefit")).toBe(true);
	});

	test("error when benefit is whitespace only", () => {
		const tc = { ...VALID_TC, benefit: "   " };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "benefit")).toBe(true);
	});
});

describe("validateTcAnnotation — category", () => {
	test("error when category is unknown value", () => {
		const tc = { ...VALID_TC, category: "something-made-up" as any };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "category")).toBe(true);
	});

	test("error when category is missing", () => {
		const tc = { ...VALID_TC, category: undefined as any };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "category")).toBe(true);
	});

	test("all 9 valid category values pass", () => {
		const categories = [
			"abstraction", "modularity", "api-stability", "automation",
			"compliance-readiness", "knowledge-preservation",
			"configurability", "observability", "reusability",
		] as const;
		categories.forEach((cat) => {
			const tc = { ...VALID_TC, category: cat };
			expect(validateTcAnnotation(tc)).toEqual([]);
		});
	});
});

describe("validateTcAnnotation — conditions", () => {
	test("error when conditions is empty string", () => {
		const tc = { ...VALID_TC, conditions: "" };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "conditions")).toBe(true);
	});
});

describe("validateTcAnnotation — confidence", () => {
	test("error when confidence is 0", () => {
		const tc = { ...VALID_TC, confidence: 0 as any };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "confidence")).toBe(true);
	});

	test("error when confidence is 6", () => {
		const tc = { ...VALID_TC, confidence: 6 as any };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "confidence")).toBe(true);
	});

	test("error when confidence is a float", () => {
		const tc = { ...VALID_TC, confidence: 3.5 as any };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "confidence")).toBe(true);
	});

	test("all 5 valid confidence values pass", () => {
		([1, 2, 3, 4, 5] as const).forEach((n) => {
			const tc = { ...VALID_TC, confidence: n };
			expect(validateTcAnnotation(tc)).toEqual([]);
		});
	});
});

describe("validateTcAnnotation — signals", () => {
	test("error when a signal tag is unknown", () => {
		const tc = { ...VALID_TC, signals: { tags: ["interface-stability", "made-up-tag" as any] } };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "signals")).toBe(true);
	});

	test("no error when signals list is empty", () => {
		const tc = { ...VALID_TC, signals: { tags: [] } };
		expect(validateTcAnnotation(tc)).toEqual([]);
	});

	test("all 8 valid signal tags pass", () => {
		const tags = [
			"reduced-change-scope", "interface-stability", "faster-feature-delivery",
			"no-structural-refactor", "defect-reduction", "compliance-absorbed",
			"onboarding-speed", "reuse-observed",
		] as const;
		const tc = { ...VALID_TC, signals: { tags: [...tags] } };
		expect(validateTcAnnotation(tc)).toEqual([]);
	});
});

describe("validateTcAnnotation — status (pro field)", () => {
	test("error when status is unknown value", () => {
		const tc = { ...VALID_TC, status: "unknown-status" as any };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "status")).toBe(true);
	});

	test("all 5 valid status values pass", () => {
		const statuses = ["anticipated", "realised", "partial", "not-yet-assessable", "failed"] as const;
		statuses.forEach((s) => {
			const tc = { ...VALID_TC, status: s };
			expect(validateTcAnnotation(tc)).toEqual([]);
		});
	});
});

describe("validateTcAnnotation — related (pro field)", () => {
	test("error when a related entry is an empty string", () => {
		const tc = { ...VALID_TC, related: ["ADR-003", ""] };
		const errors = validateTcAnnotation(tc);
		expect(errors.some((e) => e.field === "related")).toBe(true);
	});

	test("no error for valid related entries", () => {
		const tc = { ...VALID_TC, related: ["ADR-003", "ADR-011"] };
		expect(validateTcAnnotation(tc)).toEqual([]);
	});
});

describe("validateTcAnnotation — multiple errors", () => {
	test("returns one error per failing field", () => {
		const tc = {
			benefit: "",
			category: "bad-cat" as any,
			conditions: "",
			signals: { tags: ["bad-tag" as any] },
			confidence: 99 as any,
		};
		const errors = validateTcAnnotation(tc);
		const fields = errors.map((e) => e.field);
		expect(fields).toContain("benefit");
		expect(fields).toContain("category");
		expect(fields).toContain("conditions");
		expect(fields).toContain("confidence");
		expect(fields).toContain("signals");
	});
});
