<template>
	<!-- eslint-disable vue/no-deprecated-slot-attribute -->
	<div id="container">
		<h3>{{ adr.title }}</h3>
		<div class="buttonGroup">
			<vscode-button class="view">View/Edit</vscode-button>
			<vscode-button class="delete">Delete</vscode-button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { provideVSCodeDesignSystem, vsCodeButton } from "@vscode/webview-ui-toolkit";

	// register VS Code UI Toolkit Components
	provideVSCodeDesignSystem().register(vsCodeButton());

	export default defineComponent({
		props: {
			adr: {
				type: Object,
				required: true,
			},
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins.scss" as *;

	#container {
		@include centered-flex(row);
		width: 100%;
		justify-content: space-between;
		margin: 0.5rem 0;
		border: 1px solid var(--vscode-descriptionForeground);
		padding: 0 1rem;
	}

	.buttonGroup {
		@include centered-flex(row);
	}

	vscode-button {
		margin: 1rem;
		&.delete {
			background: var(--vscode-editorError-foreground);

			&:hover {
				background: darken(#c34038, 6%);
			}
		}
	}
</style>
