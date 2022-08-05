<template>
	<div id="view">
		<button id="back-button" class="secondary" @click="sendMessage('main')">
			<div id="back-button-content"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
		</button>
		<div id="madr">
			<MadrTemplateBasic @validated="getValidInput" @invalidated="invalidate"></MadrTemplateBasic>
			<p id="basic-template-note">
				<em>Note: Some fields of the ADR are not shown in the Basic MADR template.</em>
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
	import vscode from "../mixins/vscode-api-mixin";
	import saveAdr from "../mixins/save-adr";

	export default defineComponent({
		components: {
			MadrTemplateBasic,
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
