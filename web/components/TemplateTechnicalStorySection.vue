<template>
	<div id="technical-story-container" class="input-group">
		<TemplateHeader :infoText="'Technical context of the ADR, e.g., a ticket or issue URL'">
			<h2>Technical Story</h2>
		</TemplateHeader>
		<input
			type="text"
			:value="technicalStory"
			@input="
				$emit('update:technicalStory', $event.target.value);
				$emit('validate');
			"
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
</style>
