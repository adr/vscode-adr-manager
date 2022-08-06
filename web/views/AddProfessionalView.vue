<template>
	<div id="add">
		<div id="professional-add-header">
			<button id="back-button" class="secondary" @click="sendMessage('main')">
				<div id="back-button-content"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
			</button>
			<div id="toggle-container">
				<h4><strong>Template: </strong></h4>
				<h4>Basic</h4>
				<Toggle v-model="toggle" @change="switchToBasicTemplate"></Toggle>
				<h4>Professional</h4>
			</div>
		</div>
		<div id="madr">
			<MadrTemplateProfessional
				@sendInput="getInput"
				@validated="enableButton"
				@invalidated="disableButton"
			></MadrTemplateProfessional>
		</div>
		<div class="button-group-container">
			<button id="create-button" :disabled="!validated" @click="createAdr('createProfessionalAdr')">
				Create ADR
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import MadrTemplateProfessional from "../components/MadrTemplateProfessional.vue";
	import Toggle from "@vueform/toggle";
	import vscode from "../mixins/vscode-api-mixin";
	import saveAdr from "../mixins/save-adr";

	export default defineComponent({
		components: {
			MadrTemplateProfessional,
			Toggle,
		},
		mixins: [vscode, saveAdr],
		data() {
			return {
				toggle: true,
			};
		},
		methods: {
			/**
			 * Switches to the basic MADR template, revealing more fields while keeping the current
			 * user inputs.
			 */
			switchToBasicTemplate() {
				this.sendMessage(
					"switchAddViewProfessionalToBasic",
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
	@use "../static/mixins" as *;

	#add {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		margin: 0;
	}

	#professional-add-header {
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
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
