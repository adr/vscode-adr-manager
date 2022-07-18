<template>
	<div id="add">
		<button id="backButton" class="secondary" @click="sendMessage('main')">
			<div id="backButtonContent"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
		</button>
		<div id="madr">
			<MadrTemplateShort @validated="getValidInput"></MadrTemplateShort>
		</div>
		<p id="shortTemplateNote"><em>Note: Some fields of the ADR are not shown in the Short ADR template.</em></p>
		<div class="buttonGroup">
			<button id="createButton" :disabled="!validated" @click="createAdr">Create ADR</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import MadrTemplateShort from "../components/MadrTemplateShort.vue";
	import vscode from "../../src/plugins/vscode-api-mixin";

	export default defineComponent({
		components: {
			MadrTemplateShort,
		},
		mixins: [vscode],
		data() {
			return {
				validated: false,
				title: "",
				contextAndProblemStatement: "",
				consideredOptions: [] as string[],
				chosenOption: "",
				explanation: "",
			};
		},
		computed: {},
		methods: {
			getValidInput(fields: {
				title: string;
				contextAndProblemStatement: string;
				consideredOptions: string[];
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
			createAdr() {
				this.sendMessage(
					"createShortAdr",
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
		/**
		 * Sets up event listeners to receive messages and data from the extension.
		 */
		mounted() {},
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
	}

	#backButtonContent {
		@include centered-flex(row);
	}

	#madr {
		@include centered-flex(row);
	}

	#shortTemplateNote {
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
