<template>
	<div id="add">
		<div id="basic-add-header">
			<button id="back-button" class="secondary" @click="sendMessage('main')">
				<div id="back-button-content"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
			</button>
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
					not shown in the basic editor mode.
				</em>
			</p>
		</div>
		<div class="button-group-container">
			<button id="create-button" :disabled="!validated" @click="createAdr('createBasicAdr')">Create ADR</button>
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
		methods: {
			/**
			 * Switches to the professional MADR template, revealing more fields while keeping the current
			 * user inputs.
			 */
			switchToProfessionalTemplate() {
				this.sendMessage(
					"switchAddViewBasicToProfessional",
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

	#add {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	#basic-add-header {
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		margin-left: 1rem;
	}

	#back-button {
		@include button-sizing;
		@include button-styling;
		margin: 1.5rem 1rem;
		padding: 0.5rem 1rem;
		background: var(--vscode-button-secondaryBackground);
	}

	#back-button-content {
		@include centered-flex(row);
	}

	#professional-fields-note {
		margin: auto 2rem;
		max-width: 40%;
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
		width: 95%;
		margin: auto;
		margin: 0 2rem;
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
