<template>
	<div id="container">
		<h3>{{ adr.title }}</h3>
		<div class="buttonGroup">
			<button id="view">View</button>
			<button id="delete">Delete</button>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

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
		margin: 0.75rem 0;
		border: 1px solid var(--vscode-descriptionForeground);
		padding: 0 1rem;
	}

	.buttonGroup {
		@include centered-flex(row);
	}

	button {
		margin: 1rem;
		padding: 0.5rem 1rem;
		width: 64px;
		&#delete {
			@include button-styling;
			background: var(--vscode-editorError-foreground);
		}
		&#view {
			@include button-styling;
			background: var(--vscode-button-background);
		}
	}
</style>
