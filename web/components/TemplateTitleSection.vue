<template>
	<div id="title-container" class="input-group">
		<TemplateHeader
			:infoText="'Describe the solved problem and the solution concisely.\n\nThe title is also used as the file name, so keep it short and avoid using special characters.'"
		>
			<h2>Title</h2>
		</TemplateHeader>
		<input
			type="text"
			spellcheck="true"
			:class="v$.title.$error ? 'invalid-input' : ''"
			v-model="v$.title.$model"
			@input="
				$emit('update:title', $event.target.value);
				$emit('validate');
			"
			ref="title"
		/>
		<h4 class="error-message" v-for="error of v$.title.$errors" :key="error.$uid">{{ error.$message }}</h4>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import useValidate from "@vuelidate/core";
	import { required, helpers } from "@vuelidate/validators";
	import TemplateHeader from "./TemplateHeader.vue";

	const noInvalidCharacters = (value: string) => {
		return !value.match(/[?*:\"<>|/\\]/);
	};

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
		mounted() {
			//@ts-ignore
			this.$refs.title.dispatchEvent(new Event("input"));
		},
		validations() {
			return {
				title: {
					required: helpers.withMessage("Title is required", required),
					noInvalidCharacters: helpers.withMessage(
						'Title must not include the following characters: ? * : " < > | / \\',
						noInvalidCharacters
					),
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
