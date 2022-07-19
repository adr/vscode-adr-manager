<template>
	<div id="optionBox" @click.self="selectOption">
		<div id="iconDiv" @click="deleteOption">
			<i class="codicon codicon-close"></i>
		</div>
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
		methods: {
			/**
			 * Emits the "selectOption" event which triggers the parent component to select the specified option
			 */
			selectOption() {
				this.$emit("selectOption");
			},
			/**
			 * Emits the "deleteOption" event which triggers the parent component to delete the specified option
			 * from the list of considered options.
			 */
			deleteOption() {
				this.$emit("deleteOption");
			},
		},
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
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		width: 10rem;
		height: 10rem;
		margin: 1rem;
		border: 1px solid var(--vscode-input-foreground);
		border-radius: 5px;
		& h3 {
			grid-area: 2 / 2 / 3 / 3;
			align-self: center;
			justify-self: center;
			color: var(--vscode-editor-foreground);
		}
	}

	#iconDiv {
		grid-area: 1 / 3 / 2 / 4;
		justify-self: right;

		& i {
			transform: scale(1.5);
			padding: 5px;
		}
	}
</style>
