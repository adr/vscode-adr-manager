<template>
	<div id="decisionOutcome">
		<TemplateHeader
			:infoText="'Add an explanation for the chosen option.\nYou can add consequences when using the Professional MADR template.'"
		>
			<h2>Decision Outcome</h2>
		</TemplateHeader>
		<h3 id="chosenOptionText">
			Chosen Option: <b>{{ chosenOptionText }}</b>
		</h3>
		<div id="explanation">
			<h3>because</h3>
			<div id="explanationInput">
				<input
					type="text"
					:class="v$.explanation.$error ? 'invalidInput' : v$.explanation.$dirty ? 'validInput' : ''"
					v-model="v$.explanation.$model"
					@input="
						$emit('update:explanation', $event.target.value);
						$emit('validate');
					"
				/>
				<h4 class="errorMessage" v-for="error of v$.explanation.$errors" :key="error.$uid">
					{{ error.$message }}
				</h4>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
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
			chosenOption: String,
			explanationProp: String,
		},
		data() {
			return {
				explanation: this.explanationProp,
			};
		},
		computed: {
			chosenOptionText() {
				return this.chosenOption !== "" ? createShortTitle(this.chosenOption!) : "none";
			},
		},
		validations() {
			return {
				chosenOption: {
					required,
					$lazy: true,
				},
				explanation: {
					required,
					$lazy: true,
				},
			};
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#chosenOptionText {
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

	#explanationInput {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.validInput,
	.validInput:focus {
		border: 1.5px solid green !important;
		outline-color: green !important;
	}

	.invalidInput,
	.invalidInput:focus {
		border: 1.5px solid var(--vscode-editorError-foreground) !important;
		outline-color: var(--vscode-editorError-foreground) !important;
	}

	.errorMessage {
		color: var(--vscode-editorError-foreground);
	}
</style>
