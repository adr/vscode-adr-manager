<template>
	<div id="add">
		<button id="backButton" class="secondary" @click="sendMessage('main')">
			<div id="backButtonContent"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
		</button>
		<div id="madr">
			<MadrTemplateBasic @validated="getValidInput" @invalidated="invalidate"></MadrTemplateBasic>
		</div>
		<p id="basicTemplateNote"><em>Note: Some fields of the ADR are not shown in the Basic MADR template.</em></p>
		<div class="buttonGroup">
			<button id="createButton" :disabled="!validated" @click="createAdr">Create ADR</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import MadrTemplateBasic from "../components/MadrTemplateBasic.vue";
	import vscode from "../../src/plugins/vscode-api-mixin";

	export default defineComponent({
		components: {
			MadrTemplateBasic,
		},
		mixins: [vscode],
		data() {
			return {
				validated: false,
				title: "",
				contextAndProblemStatement: "",
				consideredOptions: [] as {
					title: string;
					description: string;
					pros: string[];
					cons: string[];
				}[],
				chosenOption: "",
				explanation: "",
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
				contextAndProblemStatement: string;
				consideredOptions: {
					title: string;
					description: string;
					pros: string[];
					cons: string[];
				}[];
				chosenOption: string;
				explanation: string;
			}) {
				this.title = fields.title;
				this.contextAndProblemStatement = fields.contextAndProblemStatement;
				this.consideredOptions = fields.consideredOptions;
				this.chosenOption = fields.chosenOption;
				this.explanation = fields.explanation;
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
						chosenOption: this.chosenOption,
						explanation: this.explanation,
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

	#basicTemplateNote {
		margin: -0.75rem 0 2rem 1rem;
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
