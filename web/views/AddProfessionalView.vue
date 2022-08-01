<template>
	<div id="add">
		<button id="backButton" class="secondary" @click="sendMessage('main')">
			<div id="backButtonContent"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
		</button>
		<div id="madr">
			<MadrTemplateProfessional @validated="getValidInput" @invalidated="invalidate"></MadrTemplateProfessional>
		</div>
		<div class="buttonGroup">
			<button id="createButton" :disabled="!validated" @click="createAdr">Create ADR</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import MadrTemplateProfessional from "../components/MadrTemplateProfessional.vue";
	import vscode from "../../src/plugins/vscode-api-mixin";

	export default defineComponent({
		components: {
			MadrTemplateProfessional,
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
					"createProfessionalAdr",
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

	#backButton {
		@include button-sizing;
		@include button-styling;
		margin: 1.5rem 1rem;
		padding: 0.5rem 1rem;
		background: var(--vscode-button-secondaryBackground);
	}

	#backButtonContent {
		@include centered-flex(row);
	}

	#madr {
		@include centered-flex(row);
	}

	.buttonGroup {
		@include centered-flex(row);
		& #createButton {
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
