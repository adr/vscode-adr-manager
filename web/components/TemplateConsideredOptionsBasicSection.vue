<template>
	<div id="consideredOptions">
		<div id="optionsHeader">
			<TemplateHeader
				:infoText="'List of all considered options.\nClick to select an option, rearrange options by drag and drop.\nOnly write a concise description; you can add a more detailed description when using the Professional MADR template.'"
			>
				<h2>Considered Options</h2>
			</TemplateHeader>
			<AddOptionButton @addOption="$emit('addOption')"></AddOptionButton>
		</div>
		<div id="options">
			<draggable
				class="dragArea"
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
						option.title === chosenOption && index === selectedIndex ? 'selectedOption' : 'unselectedOption'
					"
					@selectOption="$emit('selectOption', index)"
					@editOption="$emit('editOption', { title: option.title, index: index })"
					@deleteOption="$emit('deleteOption', index)"
				></OptionContainerBasic>
			</draggable>
			<h4 v-if="consideredOptions.length >= 2">
				<i>Click to choose an option; rearrange options with drag & drop.</i>
			</h4>
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
		name: "TemplateTitleSection",
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

	#optionsHeader {
		display: flex;
	}

	#options {
		@include centered-flex(column);
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.dragArea {
		display: flex;
		flex-wrap: wrap;
	}

	.selectedOption {
		background: var(--vscode-editor-selectionBackground);
		& h3 {
			color: var(--vscode-editor-selectionForeground) !important;
		}
	}

	.unselectedOption {
		background: var(--vscode-editor-background);
	}
</style>
