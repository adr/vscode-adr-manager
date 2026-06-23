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

	#add-option-container {
		cursor: pointer;
		&:hover #add-option-icon {
			background: #1a8a1a;
		}
	}

	#add-option-icon {
		background: green;
		border-radius: 6px;
		padding: 6px;
		margin-right: 0.6rem;
		color: white;
		font-size: 1.4rem;
	}

	h4 {
		font-size: 1rem;
		margin: 0;
	}
</style>
