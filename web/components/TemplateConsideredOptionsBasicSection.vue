<template>
	<div id="considered-options-container">
		<div id="options-header">
			<TemplateHeader
				:infoText="'List of all considered options.\nClick to select an option, rearrange options by drag and drop.\nOnly write a concise description; you can add a more detailed description when using the Professional MADR template.'"
			>
				<h2>Considered Options</h2>
			</TemplateHeader>
			<AddOptionButton @addOption="$emit('addOption')"></AddOptionButton>
		</div>
		<div id="options">
			<draggable
				class="drag-area"
				:list="consideredOptions"
				:sort="true"
				handle="#grabber"
				@update="$emit('checkSelection', $event)"
			>
				<OptionContainerBasic
					v-for="(option, index) in consideredOptions"
					:key="index"
					:title="option.title"
					:class="
						option.title === chosenOption && index === selectedIndex
							? 'selected-option'
							: 'unselected-option'
					"
					@selectOption="$emit('selectOption', index)"
					@editOption="$emit('editOption', { title: option.title, index: index })"
					@deleteOption="$emit('deleteOption', index)"
				></OptionContainerBasic>
			</draggable>
			<div id="rearrange-message-container" v-if="consideredOptions.length >= 2">
				<h4>
					<i>Click to choose option; rearrange options by dragging</i>
				</h4>
				<i class="codicon codicon-grabber"></i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";
	import useValidate from "@vuelidate/core";
	import { required } from "@vuelidate/validators";
	import TemplateHeader from "./TemplateHeader.vue";
	import { VueDraggableNext } from "vue-draggable-next";
	import OptionContainerBasic from "./OptionContainerBasic.vue";
	import AddOptionButton from "./AddOptionButton.vue";

	export default defineComponent({
		name: "TemplateConsideredOptionsBasicSection",
		components: {
			TemplateHeader,
			OptionContainerBasic,
			AddOptionButton,
			draggable: VueDraggableNext,
		},
		setup() {
			return {
				v$: useValidate(),
			};
		},
		props: {
			consideredOptionsProp: Array as PropType<string[]>,
			chosenOption: String,
			selectedIndex: Number,
		},
		data() {
			return {
				consideredOptions: this.consideredOptionsProp,
			};
		},
		validations() {
			return {
				consideredOptions: {
					required,
					$lazy: true,
				},
			};
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#options-header {
		display: flex;
	}

	#options {
		@include centered-flex(column);
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.drag-area {
		display: flex;
		flex-wrap: wrap;
	}

	body.vscode-high-contrast .selected-option .codicon {
		color: var(--vscode-editor-background);
	}

	#rearrange-message-container {
		@include centered-flex(row);
		margin-top: 0.5rem;
		width: 100%;

		& i {
			margin-left: 0.5rem;
		}
	}
</style>
