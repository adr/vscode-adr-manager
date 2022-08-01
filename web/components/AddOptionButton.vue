<template>
	<div id="container">
		<i id="addOptionIcon" class="codicon codicon-add" @click="addOption"></i>
		<h4>Add Option</h4>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "OptionContainerShort",
		props: {
			title: {
				type: String,
				required: true,
			},
		},
		methods: {
			/**
			 * Emits the "addOption" event which triggers the parent component to add a new option
			 * to the list of considered options.
			 */
			addOption() {
				this.$emit("addOption");
			},
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins.scss" as *;

	#container {
		display: flex;
		align-items: baseline;
		justify-content: baseline;
		margin: 0 1rem 1rem 2rem;
	}

	#addOptionIcon {
		background: green;
		border-radius: 5px;
		padding: 3px;
		margin-right: 0.5rem;
		color: white;
	}
</style>
