<template>
	<div id="decision-outcome-container">
		<TemplateHeader
			:infoText="'Add an explanation for the chosen option.\nYou can add consequences when using the Professional MADR template.'"
		>
			<h2>Decision Outcome</h2>
		</TemplateHeader>
		<h3 id="chosen-option-text">
			Chosen Option: <b>{{ chosenOptionText }}</b>
		</h3>
		<div id="explanation">
			<h3>because</h3>
			<div id="explanation-input-container">
				<input
					type="text"
					:class="
						v$.decisionOutcome.explanation.$error
							? 'invalid-input'
							: v$.decisionOutcome.explanation.$dirty
							? 'valid-input'
							: ''
					"
					v-model="v$.decisionOutcome.explanation.$model"
					@input="
						$emit('update:explanation', $event.target.value);
						$emit('validate');
					"
				/>
				<h4 class="error-message" v-for="error of v$.decisionOutcome.explanation.$errors" :key="error.$uid">
					{{ error.$message }}
				</h4>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";
	import useValidate from "@vuelidate/core";
	import { required } from "@vuelidate/validators";
	import TemplateHeader from "./TemplateHeader.vue";
	import { createShortTitle } from "../../src/plugins/utils";

	export default defineComponent({
		name: "TemplateDecisionOutcomeBasicSection",
		components: {
			TemplateHeader,
		},
		setup() {
			return {
				v$: useValidate(),
			};
		},
		props: {
			decisionOutcomeProp: {
				type: Object as PropType<{
					chosenOption: string;
					explanation: string;
					positiveConsequences: string[];
					negativeConsequences: string[];
				}>,
				default: {
					chosenOption: "",
					explanation: "",
					positiveConsequences: [] as string[],
					negativeConsequences: [] as string[],
				},
			},
		},
		data() {
			return {
				decisionOutcome: this.decisionOutcomeProp,
			};
		},
		computed: {
			chosenOptionText() {
				return this.decisionOutcome.chosenOption !== ""
					? createShortTitle(this.decisionOutcome.chosenOption!)
					: "none";
			},
		},
		validations() {
			return {
				decisionOutcome: {
					chosenOption: {
						required,
						$lazy: true,
					},
					explanation: {
						required,
						$lazy: true,
					},
				},
			};
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#chosen-option-text {
		margin-top: 2rem;
	}

	#explanation {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-top: 1.5rem;
		& h3 {
			margin-right: 2rem;
		}
	}

	#explanation-input-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.valid-input,
	.valid-input:focus {
		border: 1.5px solid green !important;
		outline-color: green !important;
	}

	.invalid-input,
	.invalid-input:focus {
		border: 1.5px solid var(--vscode-editorError-foreground) !important;
		outline-color: var(--vscode-editorError-foreground) !important;
	}

	.error-message {
		color: var(--vscode-editorError-foreground);
	}
</style>
