<template>
	<div id="template">
		<TemplateTitleSection
			:titleProp="title"
			ref="title"
			v-model:title="title"
			@validate="validate('title')"
			:key="dataFetched"
		></TemplateTitleSection>
		<TemplateDateStatusDecidersSection
			v-model:date="date"
			v-model:status="status"
			v-model:deciders="deciders"
			@validate="validateAll"
			:key="dataFetched"
		></TemplateDateStatusDecidersSection>
		<TemplateTechnicalStorySection
			v-model:technicalStory="technicalStory"
			@validate="validateAll"
			:key="dataFetched"
		></TemplateTechnicalStorySection>
		<hr />
		<TemplateContextAndProblemStatementSection
			:contextAndProblemStatementProp="contextAndProblemStatement"
			ref="contextAndProblemStatement"
			v-model:contextAndProblemStatement="contextAndProblemStatement"
			@validate="validate('contextAndProblemStatement')"
			:key="dataFetched"
		></TemplateContextAndProblemStatementSection>
		<hr />
		<TemplateDecisionDriversSection
			:decisionDriversProp="decisionDrivers"
			v-model:decisionDrivers="decisionDrivers"
			@update:decisionDrivers="validateAll"
			:key="dataFetched"
		></TemplateDecisionDriversSection>
		<hr />
		<TemplateConsideredOptionsProfessionalSection
			:consideredOptionsProp="consideredOptions"
			ref="consideredOptions"
			v-model:consideredOptions="consideredOptions"
			v-model:chosenOption="decisionOutcome.chosenOption"
			v-model:selectedIndex="selectedIndex"
			@addOption="addOption"
			@selectOption="selectOption"
			@deleteOption="deleteOption"
			@checkSelection="checkSelection"
			:key="dataFetched"
		></TemplateConsideredOptionsProfessionalSection>
		<hr />
		<TemplateDecisionOutcomeProfessionalSection
			:decisionOutcomeProp="decisionOutcome"
			ref="decisionOutcome"
			v-model:explanation="decisionOutcome.explanation"
			v-model:positiveConsequences="decisionOutcome.positiveConsequences"
			v-model:negativeConsequences="decisionOutcome.negativeConsequences"
			@validate="validate('explanation')"
			@updateArray="validateAll"
			:key="dataFetched"
		></TemplateDecisionOutcomeProfessionalSection>
		<hr />
		<TemplateLinksSection
			:linksProp="links"
			v-model:links="links"
			@update:links="validateAll"
			:key="dataFetched"
		></TemplateLinksSection>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import vscode from "../../src/plugins/vscode-api-mixin";
	import TemplateDateStatusDecidersSection from "./TemplateDateStatusDecidersSection.vue";
	import TemplateTitleSection from "./TemplateTitleSection.vue";
	import TemplateTechnicalStorySection from "./TemplateTechnicalStorySection.vue";
	import TemplateContextAndProblemStatementSection from "./TemplateContextAndProblemStatementSection.vue";
	import TemplateDecisionDriversSection from "./TemplateDecisionDriversSection.vue";
	import TemplateConsideredOptionsProfessionalSection from "./TemplateConsideredOptionsProfessionalSection.vue";
	import TemplateDecisionOutcomeProfessionalSection from "./TemplateDecisionOutcomeProfessionalSection.vue";
	import TemplateLinksSection from "./TemplateLinksSection.vue";
	import { createShortTitle } from "../../src/plugins/utils";

	export default defineComponent({
		name: "MadrTemplateProfessional",
		components: {
			TemplateDateStatusDecidersSection,
			TemplateTitleSection,
			TemplateTechnicalStorySection,
			TemplateContextAndProblemStatementSection,
			TemplateDecisionDriversSection,
			TemplateConsideredOptionsProfessionalSection,
			TemplateDecisionOutcomeProfessionalSection,
			TemplateLinksSection,
		},
		mixins: [vscode],
		data() {
			return {
				title: "",
				oldTitle: "",
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
				selectedIndex: -1,
				showModal: false,
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
				this.date = adr.date;
				this.status = adr.status;
				this.deciders = adr.deciders;
				this.technicalStory = adr.technicalStory;
				this.contextAndProblemStatement = adr.contextAndProblemStatement;
				this.decisionDrivers = adr.decisionDrivers;
				this.consideredOptions = adr.consideredOptions;
				this.decisionOutcome = adr.decisionOutcome;
				this.links = adr.links;
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
						date: this.date,
						status: this.status,
						deciders: this.deciders,
						technicalStory: this.technicalStory,
						contextAndProblemStatement: this.contextAndProblemStatement,
						decisionDrivers: this.decisionDrivers,
						consideredOptions: this.consideredOptions,
						decisionOutcome: this.decisionOutcome,
						links: this.links,
					});
				} else {
					this.$emit("invalidated");
				}
			},
		},
		mounted() {
			// add listener to receive option title from user input
			window.addEventListener("message", (event) => {
				const message = event.data;
				switch (message.command) {
					case "addOption":
						this.consideredOptions.push({ title: message.option, description: "", pros: [], cons: [] });
						if (this.consideredOptions.length === 1) {
							this.selectOption(0);
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
