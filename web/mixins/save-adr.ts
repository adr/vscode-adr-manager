//@ts-nocheck
// Vue mixin which holds all the data used by the webview to save a new/edited ADR

export default {
	data() {
		return {
			validated: false,
			title: "",
			date: "",
			status: "",
			deciders: "",
			technicalStory: "",
			contextAndProblemStatement: "",
			decisionDrivers: [] as string[],
			consideredOptions: [] as {
				title: string;
				description: string;
				pros: string[];
				cons: string[];
			}[],
			decisionOutcome: {
				chosenOption: "",
				explanation: "",
				positiveConsequences: [] as string[],
				negativeConsequences: [] as string[],
			},
			links: [] as string[],
			fullPath: "",
		};
	},
	methods: {
		/**
		 * Saves the values of the MADR template in the view component's data variables.
		 * @param fields The values of the ADR fields
		 */
		getInput(fields: {
			title: string;
			date: string;
			status: string;
			deciders: string;
			technicalStory: string;
			contextAndProblemStatement: string;
			decisionDrivers: string[];
			consideredOptions: {
				title: string;
				description: string;
				pros: string[];
				cons: string[];
			}[];
			decisionOutcome: {
				chosenOption: string;
				explanation: string;
				positiveConsequences: string[];
				negativeConsequences: string[];
			};
			links: string[];
			fullPath: string;
		}) {
			this.title = fields.title;
			this.date = fields.date;
			this.status = fields.status;
			this.deciders = fields.deciders;
			this.technicalStory = fields.technicalStory;
			this.contextAndProblemStatement = fields.contextAndProblemStatement;
			this.decisionDrivers = fields.decisionDrivers;
			this.consideredOptions = fields.consideredOptions;
			this.decisionOutcome = fields.decisionOutcome;
			this.links = fields.links;
			this.fullPath = fields.fullPath;
		},
		/**
		 * Sets the validated flag to true if the template has been filled out properly, thus enabling the
		 * "Create/Save ADR" button.
		 */
		enableButton() {
			this.validated = true;
		},
		/**
		 * Sets the validated flag to false if the template has not been filled out properly, thus disabling the
		 * "Create/Save ADR" button.
		 */
		disableButton() {
			this.validated = false;
		},
		/**
		 * Sends a message to the extension to create and save the ADR as a Markdown file
		 * in the ADR directory.
		 */
		createAdr(type: string) {
			if (type === "createBasicAdr") {
				this.sendMessage(
					type,
					JSON.stringify({
						title: this.title,
						contextAndProblemStatement: this.contextAndProblemStatement,
						consideredOptions: this.consideredOptions,
						chosenOption: this.decisionOutcome.chosenOption,
						explanation: this.decisionOutcome.explanation,
					})
				);
			} else {
				this.sendMessage(
					type,
					JSON.stringify({
						title: this.title,
						date: this.date,
						status: this.status,
						deciders: this.deciders,
						technicalStory: this.technicalStory,
						contextAndProblemStatement: this.contextAndProblemStatement,
						decisionDrivers: this.decisionDrivers,
						consideredOptions: this.consideredOptions,
						decisionOutcome: this.decisionOutcome,
						links: this.links.filter((link) => link),
					})
				);
			}
		},
		/**
		 * Sends a message to the extension to create and save the ADR as a Markdown file
		 * in the ADR directory.
		 */
		saveAdr() {
			this.sendMessage(
				"saveAdr",
				JSON.stringify({
					adr: {
						title: this.title,
						oldTitle: this.oldTitle,
						date: this.date,
						status: this.status,
						deciders: this.deciders,
						technicalStory: this.technicalStory,
						contextAndProblemStatement: this.contextAndProblemStatement,
						decisionDrivers: this.decisionDrivers,
						consideredOptions: this.consideredOptions,
						decisionOutcome: this.decisionOutcome,
						links: this.links,
						fullPath: this.fullPath,
					},
				})
			);
		},
	},
};
