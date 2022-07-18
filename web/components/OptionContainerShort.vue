<template>
	<div id="optionBox">
		<h3>
			<b>{{ title }}</b>
		</h3>
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

	body.vscode-high-contrast {
		& #optionBox {
			border: 1px solid var(--vscode-contrastBorder);
		}
	}

	#optionBox {
		@include centered-flex(column);
		width: 10rem;
		height: 10rem;
		margin: 1rem;
		border: 1px solid var(--vscode-input-foreground);
		border-radius: 5px;
		& h3 {
			color: var(--vscode-editor-foreground);
		}
	}
</style>
