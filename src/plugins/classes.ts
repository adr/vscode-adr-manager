import { cleanUpString } from "./utils";

/**
 * This models a single MADR. A MADR is parsed using `MADR.g4` and parser.js
 *
 * This class has been taken from the original ADR Manager and adapted to TypeScript,
 * see [original in JavaScript](https://github.com/adr/adr-manager/blob/main/src/plugins/classes.js)
 */
export class ArchitecturalDecisionRecord {
	[key: string]: any;
	title: string;
	status: string;
	conforming: boolean;
	deciders: string;
	date: string;
	technicalStory: string;
	contextAndProblemStatement: string;
	decisionDrivers: string[];
	highestOptionId: number;
	consideredOptions: { title: string; description: string; pros: string[]; cons: string[]; id: number }[];
	decisionOutcome: {
		chosenOption: string;
		explanation: string;
		positiveConsequences: string[];
		negativeConsequences: string[];
	};
	links: string[];

	constructor({
		title = "",
		status = "",
		conforming = true,
		deciders = "",
		date = "",
		technicalStory = "",
		contextAndProblemStatement = "",
		decisionDrivers = [] as string[],
		consideredOptions = [] as { title: string; description: string; pros: string[]; cons: string[] }[],
		decisionOutcome = {
			chosenOption: "",
			explanation: "",
			positiveConsequences: [] as string[],
			negativeConsequences: [] as string[],
		},
		links = [] as string[],
	} = {}) {
		this.title = title;
		this.status = status;
		this.conforming = conforming;
		this.deciders = deciders;
		this.date = date;
		this.technicalStory = technicalStory;
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
		this.links = links;

		// Assure invariants for decisionOutcome attribute
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "chosenOption")) {
			this.decisionOutcome.chosenOption = "";
		}
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "explanation")) {
			this.decisionOutcome.explanation = "";
		}
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "positiveConsequences")) {
			this.decisionOutcome.positiveConsequences = [] as string[];
		}
		if (!Object.prototype.hasOwnProperty.call(this.decisionOutcome, "negativeConsequences")) {
			this.decisionOutcome.negativeConsequences = [] as string[];
		}

		this.cleanUp();
	}

	/**
	 * Creates, adds and returns a new option.
	 *
	 * @param option an object with optional attributes title, description, pros, cons
	 */
	addOption(option: { title?: string; description?: string; pros?: string[]; cons?: string[] }) {
		let id = this.highestOptionId;
		this.highestOptionId = this.highestOptionId + 1;
		let newOpt = {
			title: option.title || "",
			description: option.description || "",
			pros: option.pros || [],
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
		const stringFieldNames = [
			"title",
			"status",
			"date",
			"deciders",
			"technicalStory",
			"contextAndProblemStatement",
		];

		stringFieldNames.forEach((attr) => {
			this[attr] = cleanUpString(this[attr]);
		});

		this.decisionDrivers.forEach((el, idx) => {
			this.decisionDrivers[idx] = cleanUpString(el);
		});
		this.decisionDrivers = this.decisionDrivers.filter((el) => el !== "");

		this.consideredOptions.forEach((opt) => {
			opt.title = cleanUpString(opt.title);
			opt.description = cleanUpString(opt.description);
			opt.pros.forEach((el, idx) => {
				opt.pros[idx] = cleanUpString(el);
			});
			opt.pros = opt.pros.filter((el) => el !== "");
			opt.cons.forEach((el, idx) => {
				opt.cons[idx] = cleanUpString(el);
			});
			opt.cons = opt.cons.filter((el) => el !== "");
		});

		this.decisionOutcome.chosenOption = cleanUpString(this.decisionOutcome.chosenOption);
		this.decisionOutcome.explanation = cleanUpString(this.decisionOutcome.explanation);
		this.decisionOutcome.positiveConsequences.forEach((el, idx) => {
			this.decisionOutcome.positiveConsequences[idx] = cleanUpString(el);
		});
		this.decisionOutcome.positiveConsequences.forEach((el, idx) => {
			this.decisionOutcome.positiveConsequences[idx] = cleanUpString(el);
		});

		this.links.forEach((el, idx) => {
			this.links[idx] = cleanUpString(el);
		});
		this.links.filter((el) => el !== "");
	}

	/**
	 * Updates the fields of the ADR object if a field is passed with a truthy value.
	 * Otherwise, the field of the ADR remains unchanged.
	 * @param fields The fields that may be updated when editing an ADR
	 */
	update(fields: {
		title?: string;
		status?: string;
		deciders?: string;
		date?: string;
		technicalStory?: string;
		contextAndProblemStatement?: string;
		decisionDrivers?: string[];
		consideredOptions?: { title: string; description: string; pros: string[]; cons: string[] }[];
		decisionOutcome?: {
			chosenOption: string;
			explanation: string;
			positiveConsequences: string[];
			negativeConsequences: string[];
		};
		links?: string[];
	}) {
		this.title = fields.title ?? this.title;
		this.status = fields.status ?? this.status;
		this.deciders = fields.deciders ?? this.deciders;
		this.date = fields.date ?? this.date;
		this.technicalStory = fields.technicalStory ?? this.technicalStory;
		this.contextAndProblemStatement = fields.contextAndProblemStatement ?? this.contextAndProblemStatement;
		this.decisionDrivers = fields.decisionDrivers ?? this.decisionDrivers;
		this.decisionOutcome = fields.decisionOutcome ?? this.decisionOutcome;
		this.links = fields.links ?? this.links;
		if (fields.consideredOptions && fields.consideredOptions.length) {
			this.updateConsideredOptions(fields.consideredOptions);
		}
	}

	/**
	 * Updates the considered options of the ADR, along with the highest options ID.
	 * @param options The updated considered options of the ADR
	 */
	private updateConsideredOptions(options: { title: string; description: string; pros: string[]; cons: string[] }[]) {
		this.highestOptionId = 0;
		this.consideredOptions = [];
		for (const option of options) {
			this.addOption(option);
		}
	}
}
