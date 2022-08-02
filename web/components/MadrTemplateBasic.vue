<template>
	<div id="template">
		<TemplateTitleSection
			:titleProp="title"
			ref="title"
			v-model:title="title"
			@validate="validate('title')"
			:key="dataFetched"
		></TemplateTitleSection>
		<hr />
		<TemplateContextAndProblemStatementSection
			:contextAndProblemStatementProp="contextAndProblemStatement"
			ref="contextAndProblemStatement"
			v-model:contextAndProblemStatement="contextAndProblemStatement"
			@validate="validate('contextAndProblemStatement')"
			:key="dataFetched"
		></TemplateContextAndProblemStatementSection>
		<hr />
		<TemplateConsideredOptionsBasicSection
			:consideredOptionsProp="consideredOptions"
			ref="consideredOptions"
			v-model:consideredOptions="consideredOptions"
			v-model:chosenOption="chosenOption"
			v-model:selectedIndex="selectedIndex"
			@addOption="addOption"
			@selectOption="selectOption"
			@editOption="editOption"
			@deleteOption="deleteOption"
			@checkSelection="checkSelection"
			:key="dataFetched"
		></TemplateConsideredOptionsBasicSection>
		<hr />
		<TemplateDecisionOutcomeBasicSection
			:explanationProp="explanation"
			ref="decisionOutcome"
			v-model:chosenOption="chosenOption"
			v-model:explanation="explanation"
			@validate="validate('explanation')"
			:key="dataFetched"
		></TemplateDecisionOutcomeBasicSection>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import vscode from "../../src/plugins/vscode-api-mixin";
	import TemplateTitleSection from "./TemplateTitleSection.vue";
	import TemplateContextAndProblemStatementSection from "./TemplateContextAndProblemStatementSection.vue";
	import TemplateConsideredOptionsBasicSection from "./TemplateConsideredOptionsBasicSection.vue";
	import { createShortTitle } from "../../src/plugins/utils";
	import TemplateDecisionOutcomeBasicSection from "./TemplateDecisionOutcomeBasicSection.vue";

	export default defineComponent({
		name: "MadrTemplateBasic",
		components: {
			TemplateTitleSection,
			TemplateContextAndProblemStatementSection,
			TemplateConsideredOptionsBasicSection,
			TemplateDecisionOutcomeBasicSection,
		},
		mixins: [vscode],
		data() {
			return {
				title: "",
				oldTitle: "",
				contextAndProblemStatement: "",
				consideredOptions: [] as {
					title: string;
					description: string;
					pros: string[];
					cons: string[];
				}[],
				chosenOption: "",
				explanation: "",
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
			}) {
				this.title = adr.title;
				this.oldTitle = adr.title;
				this.contextAndProblemStatement = adr.contextAndProblemStatement;
				this.consideredOptions = adr.consideredOptions;
				this.chosenOption = adr.decisionOutcome.chosenOption;
				this.explanation = adr.decisionOutcome.explanation;
				this.selectOption(
					this.consideredOptions.findIndex((option) => {
						return createShortTitle(option.title) === createShortTitle(this.chosenOption);
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
					this.chosenOption = this.consideredOptions[this.selectedIndex].title;
				} else {
					this.chosenOption = "";
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
			 * Re-selects a previously selected option after dragging to prevent inconsistencies.
			 * @param evt The event object
			 */
			checkSelection(evt: any) {
				if (this.chosenOption === this.consideredOptions[evt.newIndex].title) {
					this.selectOption(evt.newIndex);
				}
			},
			/**
			 * Sends a message to the extension to promt the user to enter a new name for the option.
			 * @param option The option to edit
			 */
			editOption(option: { title: string; index: number }) {
				this.sendMessage("requestBasicOptionEdit", { currentTitle: option.title, index: option.index });
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
						if (!this.$refs.title.v$.title.$error) {
							this.valid.title = true;
						} else {
							this.valid.title = false;
						}
						break;
					case "contextAndProblemStatement":
						//@ts-ignore
						if (!this.$refs.contextAndProblemStatement.v$.contextAndProblemStatement.$error) {
							this.valid.contextAndProblemStatement = true;
						} else {
							this.valid.contextAndProblemStatement = false;
						}
						break;
					case "consideredOptions":
						if (
							//@ts-ignore
							!this.$refs.consideredOptions.v$.consideredOptions.$error
						) {
							this.valid.consideredOptions = true;
						} else {
							this.valid.consideredOptions = false;
						}
						break;
					case "chosenOption":
						if (
							//@ts-ignore
							!this.$refs.decisionOutcome.v$.chosenOption.$error &&
							this.selectedIndex !== -1 &&
							this.consideredOptions[this.selectedIndex].title === this.chosenOption &&
							this.chosenOption !== ""
						) {
							this.valid.chosenOption = true;
						} else {
							this.valid.chosenOption = false;
						}
						break;
					case "explanation":
						//@ts-ignore
						if (!this.$refs.decisionOutcome.v$.explanation.$error) {
							this.valid.explanation = true;
						} else {
							this.valid.explanation = false;
						}
						break;
				}
				this.activateAddButton();
			},
			/**
			 * Enables the "Create ADR" button iff all fields are valid, i.e. every property of
			 * this.valid has a value of true.
			 */
			activateAddButton() {
				if (Object.values(this.valid).every((value) => value)) {
					this.$emit("validated", {
						title: this.title,
						oldTitle: this.oldTitle,
						contextAndProblemStatement: this.contextAndProblemStatement,
						consideredOptions: this.consideredOptions,
						chosenOption: createShortTitle(this.chosenOption),
						explanation: this.explanation,
					});
				} else {
					this.$emit("invalidated");
				}
			},
		},
		mounted() {
			// add listener to receive data from extension
			window.addEventListener("message", (event) => {
				const message = event.data;
				switch (message.command) {
					case "addOption":
						this.consideredOptions.push({ title: message.option, description: "", pros: [], cons: [] });
						if (this.consideredOptions.length === 1) {
							this.selectOption(0);
						}
						break;
					case "requestBasicOptionEdit":
						if (message.newTitle) {
							const oldTitle = this.consideredOptions[message.index].title;
							this.consideredOptions[message.index].title = message.newTitle;
							if (this.chosenOption === oldTitle) {
								this.selectOption(message.index);
							}
						}
						break;
					case "fetchAdrValues":
						this.fillFields(JSON.parse(message.adr));
						break;
					case "saveSuccessful":
						this.oldTitle = this.title;
						break;
				}
			});
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	body.vscode-high-contrast {
		& input,
		textarea {
			border: 1.5px solid var(--vscode-contrastBorder);
		}
	}

	#template {
		width: 100%;
		height: auto;
		background: var(--vscode-textBlockQuote-background);
		border: 1.5px solid var(--vscode-input-foreground);
		margin: 1.5rem 1rem;
		padding: 1.5rem;
	}

	hr {
		margin-top: 2rem;
		margin-bottom: 2rem;
		border: 0.5px solid var(--vscode-input-foreground);
	}
</style>
