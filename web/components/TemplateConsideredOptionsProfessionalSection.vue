<template>
	<div id="considered-options-container">
		<div id="options-header">
			<TemplateHeader
				:infoText="'List of all considered options.\nClick to select an option, rearrange options by drag and drop.'"
			>
				<h2>Considered Options</h2>
			</TemplateHeader>
			<AddOptionButton @addOption="$emit('addOption')" draggable="false"></AddOptionButton>
		</div>
		<div id="options">
			<draggable
				class="drag-area"
				:list="consideredOptions"
				:sort="true"
				handle=".option-grabber"
				@update="$emit('checkSelection', $event)"
			>
				<OptionContainerProfessional
					v-for="(option, index) in consideredOptions"
					:prosProp="option.pros"
					:consProp="option.cons"
					:key="option"
					v-model:title="option.title"
					v-model:description="option.description"
					v-model:pros="option.pros"
					v-model:cons="option.cons"
					:class="
						option.title === chosenOption && index === selectedIndex
							? 'selected-option'
							: 'unselected-option'
					"
					@selectOption="$emit('selectOption', index)"
					@deleteOption="$emit('deleteOption', index)"
					@update:title="if (selectedIndex === index) $emit('selectOption', index);"
				></OptionContainerProfessional>
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
	import { VueDraggableNext } from "vue-draggable-next";
	import TemplateHeader from "./TemplateHeader.vue";
	import AddOptionButton from "./AddOptionButton.vue";
	import OptionContainerProfessional from "./OptionContainerProfessional.vue";

	export default defineComponent({
		name: "TemplateConsideredOptionsProfessionalSection",
		components: {
			TemplateHeader,
			AddOptionButton,
			OptionContainerProfessional,
			draggable: VueDraggableNext,
		},
		setup() {
			return {
				v$: useValidate(),
			};
		},
		props: {
			consideredOptionsProp: Array as PropType<
				{ title: string; description: string; pros: string[]; cons: string[] }[]
			>,
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
		width: 100%;
	}

	.selected-option {
		background: var(--vscode-editor-selectionBackground);
		& h3 {
			color: var(--vscode-editor-selectionForeground) !important;
		}
	}

	.unselected-option {
		background: var(--vscode-editor-background);
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
