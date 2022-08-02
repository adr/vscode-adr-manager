<template>
	<div id="contextAndProblemStatement" class="inputGroup">
		<TemplateHeader
			:infoText="'Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.\nYou may want to articulate the problem in form of a question.'"
		>
			<h2>Context and Problem Statement</h2>
		</TemplateHeader>
		<textarea
			id="autoGrow"
			:class="
				v$.contextAndProblemStatement.$error
					? 'invalidInput'
					: v$.contextAndProblemStatement.$dirty
					? 'validInput'
					: ''
			"
			v-model="v$.contextAndProblemStatement.$model"
			@input="
				$emit('update:contextAndProblemStatement', $event.target.value);
				$emit('validate');
			"
		/>
		<h4 class="errorMessage" v-for="error of v$.contextAndProblemStatement.$errors" :key="error.$uid">
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
			const textarea = document.getElementById("autoGrow")!;
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

	.inputGroup {
		margin-bottom: 1.5rem;

		& input {
			height: 3rem;
		}

		&#contextAndProblemStatement textarea {
			min-height: 6rem;
			resize: none;
			overflow-y: hidden;
		}
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
