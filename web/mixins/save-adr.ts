//@ts-nocheck
// Vue mixin which holds all the data used by the webview to save a new/edited ADR

export default {
	data() {
		return {
			validated: false,
			yaml: "",
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
	computed: {
		/**
		 * Returns true iff the current data has at least one non-required field which is not empty.
		 */
		hasProfessionalFields() {
			return (
				this.status ||
				this.deciders ||
				this.date ||
				this.technicalStory ||
				this.decisionDrivers.length ||
				this.consideredOptions.some((option) => {
					return option.description || option.pros.length || option.cons.length;
				}) ||
				this.decisionOutcome.positiveConsequences.length ||
				this.decisionOutcome.negativeConsequences.length ||
				this.links.length
			);
		},
		/**
		 * Returns a string listing all non-empty fields that are not shown in the Basic editor
		 */
		missingFieldsNote() {
			let fields = "";
			if (this.status) {
				fields = fields.concat("'Status', ");
			}
			if (this.deciders) {
				fields = fields.concat("'Deciders', ");
			}
			if (this.date) {
				fields = fields.concat("'Date', ");
			}
			if (this.technicalStory) {
				fields = fields.concat("'Technical Story', ");
			}
			if (
				this.decisionDrivers.filter((driver) => {
					driver !== "";
				}).length
			) {
				fields = fields.concat("'Decision Drivers', ");
			}
			if (
				this.consideredOptions.some((option) => {
					return option.description;
				})
			) {
				fields = fields.concat("'Option Descriptions', ");
			}
			if (
				this.consideredOptions.some((option) => {
					return (
						option.pros.filter((option) => {
							option !== "";
						}).length ||
						option.cons.filter((option) => {
							option !== "";
						}).length
					);
				})
			) {
				fields = fields.concat("'Pros and Cons of the Options', ");
			}
			if (
				this.decisionOutcome.positiveConsequences.filter((positive) => {
					positive !== "";
				}).length ||
				this.decisionOutcome.negativeConsequences.filter((negative) => {
					negative !== "";
				}).length
			) {
				fields = fields.concat("'Positive and Negative Consequences', ");
			}
			if (
				this.links.filter((link) => {
					link !== "";
				}).length
			) {
				fields = fields.concat("'Links', ");
			}

			if (fields !== "") {
				let string = "The fields ";
				string = string.concat(fields.substring(0, fields.length - 2));
				string = string.concat(" of this ADR have values, but are not shown in the basic editor mode.");
				return string;
			} else {
				return "";
			}
		},
	},
	methods: {
		/**
		 * Saves the values of the MADR template in the view component's data variables.
		 * @param fields The values of the ADR fields
		 */
		getInput(fields: {
			yaml: string;
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
			this.yaml = fields.yaml;
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
						yaml: this.yaml,
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
						yaml: this.yaml,
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
						yaml: this.yaml,
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
		/**
		 * Sends a message to the extension to open the ADR in the text editor.
		 */
		openEditor() {
			this.sendMessage("requestEdit", { fullPath: this.fullPath });
		},
		/**
		 * Update the height of 'Context and Problem Statement' and 'Explanation' textareas when the input gets large.
		 */
		updateTextAreaHeight() {
			const cps = document.getElementById("auto-grow-context-problem-statement")!;
			cps.addEventListener("input", () => {
				cps.style.height = "auto";
				cps.style.height = `${cps.scrollHeight}px`;
			});
			const explanation = document.getElementById("auto-grow-explanation")!;
			explanation.addEventListener("input", () => {
				explanation.style.height = "auto";
				explanation.style.height = `${explanation.scrollHeight}px`;
			});
		},
	},
	mounted() {
		// add listeners to receive data from extension
		window.addEventListener("message", (event) => {
			const message = event.data;
			switch (message.command) {
				case "fetchAdrValues": {
					this.getInput(JSON.parse(message.adr));
					break;
				}
				case "saveSuccessful": {
					this.fullPath = message.newPath;
					break;
				}
				case "updateFileStatus": {
					this.sendMessage("updateFileStatus", { fullPath: this.fullPath });
					break;
				}
			}
		});
	},
};
