<template>
	<div id="view">
		<div id="basic-view-header">
			<div id="header-buttons">
				<button id="back-button" class="secondary" @click="sendMessage('main')">
					<div id="back-button-content">
						<i class="codicon codicon-chevron-left"></i> Back to ADR overview
					</div>
				</button>
				<button id="text-editor-button" class="secondary" @click="openEditor">Open Text Editor</button>
			</div>
			<div id="professional-fields-note" v-if="hasProfessionalFields">
				<h4>
					<strong>{{ missingFieldsNote }}</strong>
				</h4>
			</div>
			<div id="toggle-container">
				<h4><strong>Editor Mode: </strong></h4>
				<h4>Basic</h4>
				<Toggle v-model="toggle" @change="switchToProfessionalTemplate"></Toggle>
				<h4>Professional</h4>
			</div>
		</div>
		<div id="madr">
			<MadrTemplateBasic
				@sendInput="getInput"
				@validated="enableButton"
				@invalidated="disableButton"
			></MadrTemplateBasic>
			<p id="basic-template-note">
				<em>
					Note: The fields 'Status', 'Deciders', 'Date', 'Technical Story', 'Decision Drivers', 'Option
					Descriptions', 'Pros and Cons of the Options', 'Positive and Negative Consequences' and 'Links' are
					not shonw in the basic editor mode.
				</em>
			</p>
		</div>
		<div class="button-group">
			<button id="save-button" :disabled="!validated" @click="saveAdr">Save ADR</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import MadrTemplateBasic from "../components/MadrTemplateBasic.vue";
	import Toggle from "@vueform/toggle";
	import vscode from "../mixins/vscode-api-mixin";
	import saveAdr from "../mixins/save-adr";

	export default defineComponent({
		components: {
			MadrTemplateBasic,
			Toggle,
		},
		mixins: [vscode, saveAdr],
		data() {
			return {
				toggle: false,
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
				let string = "The fields ";
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
				if (this.decisionDrivers.length) {
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
						return option.pros.length || option.cons.length;
					})
				) {
					fields = fields.concat("'Pros and Cons of the Options', ");
				}
				if (
					this.decisionOutcome.positiveConsequences.length ||
					this.decisionOutcome.negativeConsequences.length
				) {
					fields = fields.concat("'Positive and Negative Consequences', ");
				}
				if (this.links.length) {
					fields = fields.concat("'Links', ");
				}

				string = string.concat(fields.substring(0, fields.length - 2));
				string = string.concat(" of this ADR have values, but are not shown in the basic editor mode.");
				return string;
			},
		},
		methods: {
			/**
			 * Switches to the professional MADR template, revealing more fields while keeping the current
			 * user inputs.
			 */
			switchToProfessionalTemplate() {
				this.sendMessage(
					"switchViewingViewBasicToProfessional",
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
						links: this.links,
						fullPath: this.fullPath,
					})
				);
			},
		},
	});
</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style lang="scss" scoped>
	@use "../static/reset";
	@use "../static/vscode";
	@use "../static/mixins" as *;

	#view {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	#basic-view-header {
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
	}

	#header-buttons {
		display: flex;
		margin-left: 1rem;
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

	#text-editor-button {
		@include button-sizing;
		@include button-styling;
		width: 10%;
		margin: 1.5rem 1rem;
		padding: 0.5rem 1rem;
		background: var(--vscode-button-secondaryBackground);
		flex-shrink: 0;
	}

	#professional-fields-note {
		margin: auto 2rem;
		max-width: 30%;
		color: var(--vscode-editorWarning-foreground);
	}

	#toggle-container {
		@include centered-flex(row);
		margin-right: 2rem;
		& h4 {
			margin: 0 0.5rem;
		}
	}

	#madr {
		width: 100%;
		overflow: auto;
		flex-grow: 1;
		height: auto;
	}

	#basic-template-note {
		width: 70%;
		margin: 0 2rem;
	}

	.button-group {
		@include centered-flex(row);
		flex-shrink: 0;
		margin: 1rem;

		& #save-button {
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
