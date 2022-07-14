<template>
	<div id="template"></div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "MadrTemplateShort",
	});
</script>

<style lang="scss">
	@use "../static/mixins.scss" as *;

	#template {
		width: 100%;
		height: auto;
		background: var(--vscode-textBlockQuote-background);
		border: 1px solid var(--vscode-descriptionForeground);
		margin: 1.5rem 1rem;
		padding: 1.5rem;
	}
</style>
