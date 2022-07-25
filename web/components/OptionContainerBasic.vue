<template>
	<div id="optionBox" @click.self="selectOption">
		<div id="editIconDiv" @click="editOption">
			<i class="codicon codicon-edit"></i>
		</div>
		<div id="deleteIconDiv" @click="deleteOption">
			<i class="codicon codicon-close"></i>
		</div>
		<div id="text">
			<h3 @click="selectOption">
				<b>{{ shortTitle }}</b>
			</h3>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { createShortTitle } from "../../src/plugins/utils";

	export default defineComponent({
		name: "OptionContainerBasic",
		props: {
			title: {
				type: String,
				required: true,
			},
		},
		computed: {
			shortTitle() {
				return createShortTitle(this.title);
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
			/**
			 * Emits the "editOption" event which triggers the parent component to edit the specified option.
			 */
			editOption() {
				this.$emit("editOption");
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
		& .selectedOption .codicon {
			color: var(--vscode-editor-background);
		}
	}

	#optionBox {
		@include centered-flex(row);
		width: 12rem;
		height: 12rem;
		margin: 1rem;
		border: 1px solid var(--vscode-input-foreground);
		border-radius: 5px;
		&:hover {
			cursor: pointer;
			filter: brightness(110%);
			transform: scale(1.02);
		}
	}

	#text {
		@include centered-flex(row);

		text-align: center;
		width: 100%;
		margin: 10px;
		overflow-wrap: anywhere;
		& h3 {
			padding: 0;
		}
	}

	#editIconDiv {
		position: absolute;
		transform: translate(-250%, -250%);
		& i {
			transform: scale(1.2);
			padding: 5px;
		}
	}

	#deleteIconDiv {
		position: absolute;
		transform: translate(250%, -250%);
		& i {
			transform: scale(1.5);
			padding: 5px;
		}
	}
</style>
