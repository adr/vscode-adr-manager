<template>
	<div id="context-and-problem-statement-container" class="input-group">
		<TemplateHeader
			:infoText="'Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.\nYou may want to articulate the problem in form of a question.'"
		>
			<h2>Context and Problem Statement</h2>
		</TemplateHeader>
		<textarea
			id="auto-grow"
			:class="
				v$.contextAndProblemStatement.$error
					? 'invalid-input'
					: v$.contextAndProblemStatement.$dirty
					? 'valid-input'
					: ''
			"
			v-model="v$.contextAndProblemStatement.$model"
			@input="
				$emit('update:contextAndProblemStatement', $event.target.value);
				$emit('validate');
			"
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
		mounted() {
			// Auto-grow textarea of Context and Problem Statement
			const textarea = document.getElementById("auto-grow")!;
			textarea.addEventListener("input", () => {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
			});
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

		&#context-and-problem-statement-container textarea {
			min-height: 6rem;
			resize: none;
			overflow-y: hidden;
		}
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
