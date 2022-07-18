<template>
	<div id="container">
		<i id="addOptionIcon" class="codicon codicon-add"></i>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "OptionContainerShort",
		props: {
			title: {
				type: String,
				required: true,
			},
		},
		methods: {},
	});
</script>

<style lang="scss">
	@use "../static/mixins.scss" as *;

	#container {
		@include centered-flex(column);
		width: 10rem;
		height: 10rem;
		margin: 1rem;
	}

	#addOptionIcon {
		background: green;
		border: 1px solid var(--vscode-descriptionForeground);
		border-radius: 5px;
		padding: 3px;
	}
</style>
