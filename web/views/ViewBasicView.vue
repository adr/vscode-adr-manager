<template>
	<div id="view">
		<div id="non-conforming-screen" v-if="!conforming">
			<button class="secondary" id="back-button" @click="sendMessage('main')">
				<div id="back-button-content">
					<i class="codicon codicon-chevron-left"></i> Back to ADR overview
				</div>
			</button>
			<div id="non-conforming-banner">
				<i class="codicon codicon-warning"></i>
				<div id="non-conforming-text">
					<strong>This ADR does not conform to MADR 4.0 and cannot be displayed in the editor.</strong>
					<span v-if="parseErrors.length">Parse error on line {{ parseErrors[0].line }}: <em>{{ parseErrors[0].message }}</em></span>
					<span>Open it in the text editor to fix it manually, then return here to edit it.</span>
				</div>
				<button id="open-editor-banner-btn" @click="openEditor">Open in Text Editor</button>
			</div>
		</div>
		<div id="basic-view-header" v-if="conforming">
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
		<div id="madr" v-if="conforming">
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
		<div class="button-group" v-if="conforming">
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
						consulted: this.consulted,
						informed: this.informed,
						technicalStory: this.technicalStory,
						contextAndProblemStatement: this.contextAndProblemStatement,
						decisionDrivers: this.decisionDrivers,
						consideredOptions: this.consideredOptions,
						decisionOutcome: this.decisionOutcome,
						links: this.links,
						tc: this.tc,
						fullPath: this.fullPath,
					})
				);
			},
		},
		mounted() {
			// Signal to the extension that the webview is ready to receive ADR data
			this.sendMessage("webviewReady");
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

	#non-conforming-screen {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	#non-conforming-banner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin: auto;
		padding: 2rem 2.5rem;
		max-width: 480px;
		border: 1.5px solid var(--vscode-editorWarning-foreground);
		border-radius: 8px;
		background: var(--vscode-editor-background);
		text-align: center;

		.codicon {
			font-size: 2.5rem;
			color: var(--vscode-editorWarning-foreground);
		}

		#non-conforming-text {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			color: var(--vscode-foreground);
			font-size: 0.9rem;

			strong {
				font-size: 1rem;
			}

			em {
				word-break: break-word;
			}
		}

		#open-editor-banner-btn {
			margin-top: 0.5rem;
			padding: 0.5rem 1.5rem;
			background: var(--vscode-button-background);
			color: var(--vscode-button-foreground);
			border: none;
			border-radius: 4px;
			cursor: pointer;
			font-size: 0.9rem;
			&:hover {
				background: var(--vscode-button-hoverBackground);
			}
		}
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
