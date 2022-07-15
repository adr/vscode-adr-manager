<template>
	<div id="add">
		<button id="backButton" class="secondary" @click="sendMessage('main')">
			<div id="backButtonContent"><i class="codicon codicon-chevron-left"></i> Back to ADR overview</div>
		</button>
		<div id="madr">
			<MadrTemplateShort></MadrTemplateShort>
		</div>
		<p id="shortTemplateNote"><em>Note: Some fields of the ADR are not shown in the Short ADR template.</em></p>
		<div class="buttonGroup">
			<button id="createButton">Create ADR</button>
			<!--<button id="cancelButton">Cancel</button>-->
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
			return {};
		},
		computed: {},
		methods: {},
		/**
		 * Sets up event listeners to receive messages and data from the extension.
		 */
		mounted() {
			window.addEventListener("message", (event) => {
				const message = event.data;
				switch (message.command) {
				}
			});
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
		justify-content: center;
		width: 100%;
		& button {
			@include button-sizing;
			@include button-styling;
			margin: 1rem;
			padding: 0.5rem 1rem;
		}

		& #createButton {
			background: var(--vscode-button-background);
		}
		& #cancelButton {
			background: var(--vscode-button-secondaryBackground);
		}
	}
</style>
