<template>
	<div id="title" class="inputGroup">
		<TemplateHeader
			:infoText="'Describe the solved problem and the solution concisely.\n\nThe title is also used as the file name, so keep it short and avoid using special characters.'"
		>
			<h2>Title</h2>
		</TemplateHeader>
		<input
			type="text"
			:class="v$.title.$error ? 'invalidInput' : v$.title.$dirty ? 'validInput' : ''"
			v-model="v$.title.$model"
			@input="
				$emit('update:title', $event.target.value);
				$emit('validate');
			"
		/>
		<h4 class="errorMessage" v-for="error of v$.title.$errors" :key="error.$uid">{{ error.$message }}</h4>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import useValidate from "@vuelidate/core";
	import { required } from "@vuelidate/validators";
	import TemplateHeader from "./TemplateHeader.vue";

	export default defineComponent({
		name: "TemplateTitleSection",
		components: {
			TemplateHeader,
		},
		setup() {
			return {
				v$: useValidate(),
			};
		},
		props: {
			titleProp: String,
		},
		data() {
			return {
				title: this.titleProp,
			};
		},
		validations() {
			return {
				title: {
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
