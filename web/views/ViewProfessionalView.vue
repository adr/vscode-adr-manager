<template>
	<div id="view">
		<button id="backButton" class="secondary" @click="sendMessage('main')">
			<div id="backButtonContent"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
		</button>
		<div id="madr">
			<MadrTemplateProfessional @validated="getValidInput" @invalidated="invalidate"></MadrTemplateProfessional>
		</div>
		<div class="buttonGroup">
			<button id="createButton" :disabled="!validated" @click="saveAdr">Save ADR</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import MadrTemplateProfessional from "../components/MadrTemplateProfessional.vue";
	import vscode from "../mixins/vscode-api-mixin";
	import saveAdr from "../mixins/save-adr";

	export default defineComponent({
		components: {
			MadrTemplateProfessional,
		},
		mixins: [vscode, saveAdr],
	});
</script>

<style lang="scss">
	@use "../static/mixins" as *;

	#view {
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
		flex-shrink: 0;
	}

	#backButtonContent {
		@include centered-flex(row);
	}

	#madr {
		width: 100%;
		overflow: auto;
		flex-grow: 1;
	}

	.buttonGroup {
		@include centered-flex(row);
		flex-shrink: 0;

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
