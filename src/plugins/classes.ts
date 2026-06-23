import { cleanUpString } from "./utils";
import { TcAnnotation } from "./tc-types";

/**
 * This models a single MADR 4.0. A MADR is parsed using `MADR.g4` and parser.js
 *
 * This class has been taken from the original ADR Manager and adapted to TypeScript,
 * see [original in JavaScript](https://github.com/adr/adr-manager/blob/main/src/plugins/classes.js)
 */
export class ArchitecturalDecisionRecord {
	[key: string]: any;
	yaml: string;
	title: string;
	status: string;
	conforming: boolean;
	parseErrors: { message: string; line: number; charPosition: number }[];
	decisionMakers: string[];
	consulted: string[];
	informed: string[];
	date: string;
	contextAndProblemStatement: string;
	decisionDrivers: string[];
	highestOptionId: number;
	consideredOptions: {
		title: string;
		description: string;
		pros: string[];
		neutral: string[];
		cons: string[];
		id: number;
	}[];
	decisionOutcome: {
		chosenOption: string;
		explanation: string;
		consequences: { good: string[]; bad: string[] };
		confirmation: string;
	};
	moreInformation: string;
	links: string[];
	tc?: TcAnnotation;

	constructor({
		yaml = "",
		title = "",
		status = "",
		conforming = true,
		parseErrors = [],
		decisionMakers = [] as string[],
		consulted = [] as string[],
		informed = [] as string[],
		date = "",
		contextAndProblemStatement = "",
		decisionDrivers = [] as string[],
		consideredOptions = [] as {
			title: string;
			description: string;
			pros: string[];
			neutral: string[];
			cons: string[];
		}[],
		decisionOutcome = {
			chosenOption: "",
			explanation: "",
			consequences: { good: [] as string[], bad: [] as string[] },
			confirmation: "",
		},
		moreInformation = "",
		links = [] as string[],
		tc = undefined as TcAnnotation | undefined,
	} = {}) {
		this.yaml = yaml;
		this.title = title;
		this.status = status;
		this.conforming = conforming;
		this.parseErrors = parseErrors;
		this.decisionMakers = decisionMakers;
		this.consulted = consulted;
		this.informed = informed;
		this.date = date;
		this.contextAndProblemStatement = contextAndProblemStatement;
		this.decisionDrivers = decisionDrivers;
		this.highestOptionId = 0;
		this.consideredOptions = [];
		if (consideredOptions && consideredOptions.length > 0) {
			for (let i = 0; i < consideredOptions.length; i++) {
				this.addOption(consideredOptions[i]);
			}
		}
		this.decisionOutcome = decisionOutcome;
		this.moreInformation = moreInformation;
		this.links = links;
		this.tc = tc;

		// Assure invariants for decisionOutcome attribute
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "chosenOption")) {
			this.decisionOutcome.chosenOption = "";
		}
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "explanation")) {
			this.decisionOutcome.explanation = "";
		}
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "consequences")) {
			this.decisionOutcome.consequences = { good: [] as string[], bad: [] as string[] };
		}
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "confirmation")) {
			this.decisionOutcome.confirmation = "";
		}

		this.cleanUp();
	}

	/**
	 * Creates, adds and returns a new option.
	 *
	 * @param option an object with optional attributes title, description, pros, neutral, cons
	 */
	addOption(option: {
		title?: string;
		description?: string;
		pros?: string[];
		neutral?: string[];
		cons?: string[];
	}) {
		let id = this.highestOptionId;
		this.highestOptionId = this.highestOptionId + 1;
		let newOpt = {
			title: option.title || "",
			description: option.description || "",
			pros: option.pros || [],
			neutral: option.neutral || [],
			cons: option.cons || [],
			id: id, // needed as key/id (for referencing an option or as key in v-for or drag'n'drop)
		};
		this.consideredOptions.push(newOpt);
		return newOpt;
	}
	getOptionByTitle(title: string) {
		return this.consideredOptions.find((el) => {
			return el.title.startsWith(title);
		});
	}

	/**
	 * Cleans up the ADR:
	 *  - Asserts that all string attributes contain a string value.
	 *  - Trims all strings.
	 */
	cleanUp() {
		const stringFieldNames = ["yaml", "title", "status", "date", "contextAndProblemStatement", "moreInformation"];

		stringFieldNames.forEach((attr) => {
			this[attr] = cleanUpString(this[attr]);
		});

		const stringArrayFieldNames = ["decisionMakers", "consulted", "informed", "decisionDrivers", "links"];
		stringArrayFieldNames.forEach((attr) => {
			this[attr] = (this[attr] as string[]).map((el) => cleanUpString(el)).filter((el) => el !== "");
		});

		this.consideredOptions.forEach((opt) => {
			opt.title = cleanUpString(opt.title);
			opt.description = cleanUpString(opt.description);
			opt.pros = opt.pros.map((el) => cleanUpString(el)).filter((el) => el !== "");
			opt.neutral = opt.neutral.map((el) => cleanUpString(el)).filter((el) => el !== "");
			opt.cons = opt.cons.map((el) => cleanUpString(el)).filter((el) => el !== "");
		});

		this.decisionOutcome.chosenOption = cleanUpString(this.decisionOutcome.chosenOption);
		this.decisionOutcome.explanation = cleanUpString(this.decisionOutcome.explanation);
		this.decisionOutcome.confirmation = cleanUpString(this.decisionOutcome.confirmation);
		this.decisionOutcome.consequences.good = this.decisionOutcome.consequences.good
			.map((el) => cleanUpString(el))
			.filter((el) => el !== "");
		this.decisionOutcome.consequences.bad = this.decisionOutcome.consequences.bad
			.map((el) => cleanUpString(el))
			.filter((el) => el !== "");
	}

	/**
	 * Updates the fields of the ADR object if a field is passed with a truthy value.
	 * Otherwise, the field of the ADR remains unchanged.
	 * @param fields The fields that may be updated when editing an ADR
	 */
	update(fields: {
		yaml?: string;
		title?: string;
		status?: string;
		decisionMakers?: string[];
		consulted?: string[];
		informed?: string[];
		date?: string;
		contextAndProblemStatement?: string;
		decisionDrivers?: string[];
		consideredOptions?: {
			title: string;
			description: string;
			pros: string[];
			neutral: string[];
			cons: string[];
		}[];
		decisionOutcome?: {
			chosenOption: string;
			explanation: string;
			consequences: { good: string[]; bad: string[] };
			confirmation: string;
		};
		moreInformation?: string;
		links?: string[];
		tc?: TcAnnotation;
	}) {
		this.yaml = fields.yaml ?? this.yaml;
		this.title = fields.title ?? this.title;
		this.status = fields.status ?? this.status;
		this.decisionMakers = fields.decisionMakers ?? this.decisionMakers;
		this.consulted = fields.consulted ?? this.consulted;
		this.informed = fields.informed ?? this.informed;
		this.date = fields.date ?? this.date;
		this.contextAndProblemStatement = fields.contextAndProblemStatement ?? this.contextAndProblemStatement;
		this.decisionDrivers = fields.decisionDrivers ?? this.decisionDrivers;
		this.decisionOutcome = fields.decisionOutcome ?? this.decisionOutcome;
		this.moreInformation = fields.moreInformation ?? this.moreInformation;
		this.links = fields.links ?? this.links;
		this.tc = fields.tc ?? this.tc;
		if (fields.consideredOptions && fields.consideredOptions.length) {
			this.updateConsideredOptions(fields.consideredOptions);
		}
	}

	/**
	 * Updates the considered options of the ADR, along with the highest options ID.
	 * @param options The updated considered options of the ADR
	 */
	private updateConsideredOptions(
		options: { title: string; description: string; pros: string[]; neutral: string[]; cons: string[] }[]
	) {
		this.highestOptionId = 0;
		this.consideredOptions = [];
		for (const option of options) {
			this.addOption(option);
		}
	}
}
