<template>
	<div id="technical-story-container" class="input-group">
		<TemplateHeader :infoText="'Technical context of the ADR, e.g., a ticket or issue URL'">
			<h2>Technical Story</h2>
		</TemplateHeader>
		<textarea
			id="auto-grow-technical-story"
			spellcheck="true"
			:value="technicalStory"
			@input="
				updateHeight();
				$emit('update:technicalStory', $event.target.value);
				$emit('validate');
			"
			ref="technicalStory"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import TemplateHeader from "./TemplateHeader.vue";

	export default defineComponent({
		name: "TemplateTechnicalStorySection",
		components: {
			TemplateHeader,
		},
		props: {
			technicalStory: String,
		},
		methods: {
			/**
			 * Updated the height of the textarea based on the input.
			 */
			updateHeight() {
				this.$nextTick(() => {
					const ts = document.getElementById("auto-grow-technical-story")!;
					ts.style.height = "auto";
					ts.style.height = `${ts.scrollHeight}px`;
				});
			},
		},
		/**
		 * Triggers the height update for textareas when first loading the webview (in case existing data is being loaded)
		 */
		mounted() {
			//@ts-ignore
			this.$refs.technicalStory.dispatchEvent(new Event("input"));
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

		& #auto-grow-technical-story {
			min-height: 39px;
			resize: none;
			overflow-y: hidden;
		}
	}
</style>
