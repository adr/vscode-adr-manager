<template>
	<div id="add-option-container">
		<i id="add-option-icon" class="codicon codicon-add" @click="addOption"></i>
		<h4>Add Option</h4>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "AddOptionButton",
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

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#add-option-container {
		display: flex;
		align-items: center;
		justify-content: baseline;
		margin: 0 1rem 1rem 2rem;
	}

	#add-option-icon {
		background: green;
		border-radius: 5px;
		padding: 2px;
		margin-right: 0.5rem;
		color: white;
	}
</style>
