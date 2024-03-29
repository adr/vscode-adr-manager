//@ts-nocheck
// Vue mixin which holds all the data used by a MADR template component
import { createShortTitle } from "../../src/plugins/utils";

export default {
	data() {
		return {
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
			selectedIndex: -1,
			valid: {
				title: false,
				contextAndProblemStatement: false,
				consideredOptions: false,
				chosenOption: false,
				explanation: false,
			},
			// key to re-render components upon receiving values of an existing ADR
			dataFetched: false,
		};
	},
	methods: {
		/**
		 * Fills the fields with the existing values of the ADR.
		 */
		fillFields(adr: {
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
			this.yaml = adr.yaml;
			this.title = adr.title;
			this.date = adr.date;
			this.status = adr.status;
			this.deciders = adr.deciders;
			this.technicalStory = adr.technicalStory;
			this.contextAndProblemStatement = adr.contextAndProblemStatement;
			this.decisionDrivers = adr.decisionDrivers.filter((driver) => driver !== "");
			this.consideredOptions = adr.consideredOptions.map((option) => {
				return {
					title: option.title,
					description: option.description,
					pros: option.pros.filter((pro) => pro !== ""),
					cons: option.cons.filter((con) => con !== ""),
				};
			});
			this.decisionOutcome = {
				chosenOption: adr.decisionOutcome.chosenOption,
				explanation: adr.decisionOutcome.explanation,
				positiveConsequences: adr.decisionOutcome.positiveConsequences.filter((positive) => positive !== ""),
				negativeConsequences: adr.decisionOutcome.negativeConsequences.filter((negative) => negative !== ""),
			};
			this.links = adr.links.filter((link) => link !== "");
			this.fullPath = adr.fullPath;
			this.selectOption(
				this.consideredOptions.findIndex((option) => {
					return createShortTitle(option.title) === createShortTitle(this.decisionOutcome.chosenOption);
				})
			);
			this.dataFetched = true;
			this.validateAll();
		},
		/**
		 * Handles the selection of options using clicks and validates that an option has been chosen.
		 * @param index The index of the clicked option
		 */
		selectOption(index: number) {
			this.selectedIndex = index;
			if (index !== -1) {
				this.decisionOutcome.chosenOption = this.consideredOptions[this.selectedIndex].title;
			} else {
				this.decisionOutcome.chosenOption = "";
			}
			this.validate("consideredOptions");
			this.validate("chosenOption");
		},
		/**
		 * Updates the selected option after an option has been deleted from the list of considered
		 * options.
		 * @param originalIndex The original index of the deleted option (before deletion)
		 */
		selectOptionAfterDeletion(originalIndex: number) {
			// check if selected option has been deleted
			if (originalIndex === this.selectedIndex) {
				// unselect any option such that the user has to actively select a new option
				this.selectOption(-1);
			} else if (originalIndex < this.selectedIndex) {
				// shift selected index by -1 if the deleted option came before the selected option
				this.selectOption(this.selectedIndex - 1);
			}
		},
		/**
		 * Re-selects the correct option after dragging to prevent inconsistencies.
		 * @param evt The event object
		 */
		checkSelection(evt: any) {
			// check if the dragged option is the chosen option
			if (this.decisionOutcome.chosenOption === this.consideredOptions[evt.newIndex].title) {
				this.selectOption(evt.newIndex);
			} else {
				const correctIndex = this.consideredOptions.findIndex(
					(option) => option.title === this.decisionOutcome.chosenOption
				);
				this.selectOption(correctIndex);
			}
		},
		/**
		 * Removes the considered option with the specified index from the list of considered options
		 * and selects another option in the list of considered options.
		 * @param index The index of the option to be deleted
		 */
		deleteOption(index: number) {
			this.consideredOptions.splice(index, 1);
			this.selectOptionAfterDeletion(index);
		},
		/**
		 * Sends a message to the extension to ask the user for a title when adding a new option.
		 */
		addOption() {
			this.sendMessage("addOption");
		},
		/**
		 * Sends a message to the extension to prompt the user to enter a new name for the option.
		 * @param option The option to edit
		 */
		editOption(option: { title: string; index: number }) {
			this.sendMessage("requestBasicOptionEdit", { currentTitle: option.title, index: option.index });
		},
		/**
		 * Validates every required field of the ADR.
		 */
		validateAll() {
			this.validate("title");
			this.validate("contextAndProblemStatement");
			this.validate("consideredOptions");
			this.validate("chosenOption");
			this.validate("explanation");
		},
		/**
		 * Validates a specified field of the ADR and sets a flag for each field.
		 * The user can click on the "Create ADR" button iff all fields are valid,
		 * i.e. iff all properties of this.valid have the value true.
		 * @param field The ADR field to be validated
		 */
		validate(field: string) {
			switch (field) {
				case "title":
					//@ts-ignore
					if (!this.$refs.title.v$.title.$error && this.title !== "") {
						this.valid.title = true;
					} else {
						this.valid.title = false;
					}
					break;
				case "contextAndProblemStatement":
					if (
						//@ts-ignore
						!this.$refs.contextAndProblemStatement.v$.contextAndProblemStatement.$error &&
						this.contextAndProblemStatement !== ""
					) {
						this.valid.contextAndProblemStatement = true;
					} else {
						this.valid.contextAndProblemStatement = false;
					}
					break;
				case "consideredOptions":
					if (
						//@ts-ignore
						!this.$refs.consideredOptions.v$.consideredOptions.$error &&
						this.consideredOptions.length > 0
					) {
						this.valid.consideredOptions = true;
					} else {
						this.valid.consideredOptions = false;
					}
					break;
				case "chosenOption":
					if (
						//@ts-ignore
						!this.$refs.decisionOutcome.v$.decisionOutcome.chosenOption.$error &&
						this.selectedIndex !== -1 &&
						this.consideredOptions[this.selectedIndex].title === this.decisionOutcome.chosenOption &&
						this.decisionOutcome.chosenOption !== ""
					) {
						this.valid.chosenOption = true;
					} else {
						this.valid.chosenOption = false;
					}
					break;
				case "explanation":
					if (
						//@ts-ignore
						!this.$refs.decisionOutcome.v$.decisionOutcome.explanation.$error &&
						this.decisionOutcome.explanation !== ""
					) {
						this.valid.explanation = true;
					} else {
						this.valid.explanation = false;
					}
					break;
			}
			this.sendInput();
		},
		/**
		 * Sends the ADR data from the template component to the view component.
		 * If all required fields of the template have been filled out, the "Create/Edit ADR" button
		 * will be enabled.
		 */
		sendInput() {
			this.$emit("sendInput", {
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
				links: this.links,
				fullPath: this.fullPath,
			});
			if (Object.values(this.valid).every((value) => value)) {
				this.$emit("validated");
			} else {
				this.$emit("invalidated");
			}
		},
	},
	mounted() {
		// add listeners to receive data from extension
		window.addEventListener("message", (event) => {
			const message = event.data;
			switch (message.command) {
				case "addOption": {
					this.consideredOptions.push({ title: message.option, description: "", pros: [], cons: [] });
					if (this.consideredOptions.length === 1) {
						this.selectOption(0);
					}
					this.validate("consideredOptions");
					this.validate("chosenOption");
					break;
				}
				case "fetchAdrValues": {
					this.fillFields(JSON.parse(message.adr));
					break;
				}
				case "saveSuccessful": {
					this.fullPath = message.newPath;
					break;
				}
			}
		});
	},
};
