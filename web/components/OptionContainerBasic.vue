<template>
	<div
		id="optionBox"
		@click.self="$emit('selectOption')"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<div id="editIconDiv" @click="$emit('editOption')">
			<i class="codicon codicon-edit"></i>
		</div>
		<div id="deleteIconDiv" @click="$emit('deleteOption')">
			<i class="codicon codicon-trash"></i>
		</div>
		<div id="text" @click="$emit('selectOption')">
			<h3>
				<b>{{ shortTitle }}</b>
			</h3>
		</div>
		<i id="grabber" class="codicon codicon-grabber" :class="isHovered ? 'visible' : 'invisible'"></i>
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
				default: "",
			},
		},
		data() {
			return {
				isHovered: false,
			};
		},
		computed: {
			shortTitle() {
				return createShortTitle(this.title);
			},
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	body.vscode-high-contrast #optionBox {
		border: 1px solid var(--vscode-contrastBorder);
	}

	body.vscode-high-contrast .selectedOption,
	body.vscode-high-contrast .codicon {
		color: var(--vscode-editor-foreground);
	}

	#optionBox {
		position: relative;
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

			&:hover {
				cursor: pointer;
			}
		}
	}

	#deleteIconDiv {
		position: absolute;
		transform: translate(250%, -250%);
		& i {
			transform: scale(1.25);
			padding: 5px;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.selectedOption {
		background: var(--vscode-editor-selectionBackground);
		& h3 {
			color: var(--vscode-editor-selectionForeground) !important;
		}
	}

	body.vscode-high-contrast .selectedOption .codicon {
		color: var(--vscode-editor-background);
	}

	.unselectedOption {
		background: var(--vscode-editor-background);
	}

	#grabber {
		position: absolute;
		bottom: 0.2rem;
		right: 45%;
		transform: scale(1.2);

		&:hover {
			cursor: grab;
		}

		&:active {
			cursor: grabbing;
		}
	}

	.visible {
		display: unset;
	}

	.invisible {
		display: none !important;
	}
</style>
