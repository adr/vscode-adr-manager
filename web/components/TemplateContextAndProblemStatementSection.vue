<template>
	<div id="context-and-problem-statement-container" class="input-group">
		<TemplateHeader
			:infoText="'Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.\nYou may want to articulate the problem in form of a question.'"
		>
			<h2>Context and Problem Statement</h2>
		</TemplateHeader>
		<textarea
			id="auto-grow-context-problem-statement"
			spellcheck="true"
			:class="v$.contextAndProblemStatement.$error ? 'invalid-input' : ''"
			v-model="v$.contextAndProblemStatement.$model"
			@input="
				updateHeight();
				$emit('update:contextAndProblemStatement', $event.target.value);
				$emit('validate');
			"
			ref="contextAndProblemStatement"
		/>
		<h4 class="error-message" v-for="error of v$.contextAndProblemStatement.$errors" :key="error.$uid">
			{{ error.$message }}
		</h4>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import useValidate from "@vuelidate/core";
	import { required } from "@vuelidate/validators";
	import TemplateHeader from "./TemplateHeader.vue";

	export default defineComponent({
		name: "TemplateContextAndProblemStatementSection",
		components: {
			TemplateHeader,
		},
		setup() {
			return {
				v$: useValidate(),
			};
		},
		props: {
			contextAndProblemStatementProp: String,
		},
		data() {
			return {
				contextAndProblemStatement: this.contextAndProblemStatementProp,
			};
		},
		methods: {
			/**
			 * Updated the height of the textarea based on the input.
			 */
			updateHeight() {
				this.$nextTick(() => {
					const cps = document.getElementById("auto-grow-context-problem-statement")!;
					cps.style.height = "auto";
					cps.style.height = `${cps.scrollHeight}px`;
				});
			},
		},
		/**
		 * Triggers the height update for textareas when first loading the webview (in case existing data is being loaded)
		 */
		mounted() {
			//@ts-ignore
			this.$refs.contextAndProblemStatement.dispatchEvent(new Event("input"));
		},
		validations() {
			return {
				contextAndProblemStatement: {
					required,
					$lazy: true,
				},
			};
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	.input-group {
		margin-bottom: 1.5rem;

		& input {
			height: 3rem;
		}

		& #auto-grow-context-problem-statement {
			min-height: 6rem;
			resize: none;
			overflow-y: hidden;
		}
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
