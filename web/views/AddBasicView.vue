<template>
	<div id="add">
		<button id="back-button" class="secondary" @click="sendMessage('main')">
			<div id="back-button-content"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
		</button>
		<div id="madr">
			<MadrTemplateBasic @validated="getValidInput" @invalidated="invalidate"></MadrTemplateBasic>
			<p id="basic-template-note">
				<em>Note: Some fields of the ADR are not shown in the Basic MADR template.</em>
			</p>
		</div>
		<div class="button-group-container">
			<button id="create-button" :disabled="!validated" @click="createAdr">Create ADR</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import MadrTemplateBasic from "../components/MadrTemplateBasic.vue";
	import vscode from "../mixins/vscode-api-mixin";

	export default defineComponent({
		components: {
			MadrTemplateBasic,
		},
		mixins: [vscode],
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
			};
		},
		computed: {},
		methods: {
			/**
			 * Saves the values of the Short MADR template in this component's data variables.
			 * @param fields The values of the ADR fields
			 */
			getValidInput(fields: {
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
				this.validated = true;
			},
			/**
			 * Sets the validated flag to false if the template has not been filled out properly, thus disabling the
			 * "Create ADR" button.
			 */
			invalidate() {
				this.validated = false;
			},
			/**
			 * Sends a message to the extension to create and save the ADR as a Markdown file
			 * in the ADR directory.
			 */
			createAdr() {
				this.sendMessage(
					"createBasicAdr",
					JSON.stringify({
						title: this.title,
						contextAndProblemStatement: this.contextAndProblemStatement,
						consideredOptions: this.consideredOptions,
						chosenOption: this.decisionOutcome.chosenOption,
						explanation: this.decisionOutcome.explanation,
					})
				);
			},
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins" as *;

	#add {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	#back-button {
		@include button-sizing;
		@include button-styling;
		margin: 1.5rem 1rem;
		padding: 0.5rem 1rem;
		background: var(--vscode-button-secondaryBackground);
		flex-shrink: 0;
	}

	#back-button-content {
		@include centered-flex(row);
	}

	#madr {
		width: 100%;
		overflow: auto;
	}

	#basic-template-note {
		width: 95%;
		margin: auto;
	}

	.button-group-container {
		@include centered-flex(row);
		flex-shrink: 0;
		margin: 1rem;

		& #create-button {
			@include button-sizing;
			@include button-styling;
			background: var(--vscode-button-background);
			margin: 1rem;
			padding: 0.5rem 1rem;
			&:disabled {
				filter: brightness(50%);
				cursor: default;
			}
		}
	}
</style>
