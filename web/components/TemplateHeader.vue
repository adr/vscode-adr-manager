<template>
	<div id="header">
		<slot></slot>
		<div id="icon" class="tooltip">
			<div class="right">
				<p>{{ infoText }}</p>
				<i></i>
			</div>
			<i class="codicon codicon-info"></i>
		</div>
	</div>
</template>

<script lang="ts" scoped>
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "TemplateHeader",
		props: {
			infoText: {
				type: String,
				required: true,
			},
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins.scss" as *;

	#header {
		display: flex;
		flex-direction: row;
		margin-bottom: 1rem;
		padding: 0;
		align-items: center;
	}

	#icon {
		@include centered-flex(column);
		width: 24px;
		height: 24px;
		margin-left: 1rem;
		padding: 3px;
		background: var(--vscode-textBlockQuote-background);
		border: 1px solid var(--vscode-contrastBorder);
		border-radius: 5px;
		filter: brightness(130%);
	}

	.tooltip {
		display: inline-block;
		position: relative;
		text-align: left;
		overflow: visible;
	}

	.tooltip .right {
		min-width: 16rem;
		max-width: 30rem;
		top: 50%;
		left: 100%;
		margin-left: 20px;
		transform: translate(0, -25%);
		padding: 10px 20px;
		background: var(--vscode-input-background);
		color: var(--vscode-descriptionForeground);
		border-radius: 5px;
		position: absolute;
		z-index: 99;
		box-sizing: border-box;
		display: none;
	}

	.tooltip .right p {
		white-space: pre-line;
	}

	.tooltip:hover {
		z-index: 2;
	}

	.tooltip:hover .right {
		display: block;
	}

	.tooltip .right i {
		position: absolute;
		top: 25%;
		right: 100%;
		margin-top: -15px;
		width: 15px;
		height: 30px;
		overflow: hidden;
	}

	.tooltip .right i::after {
		content: "";
		position: absolute;
		width: 15px;
		height: 15px;
		left: 0;
		top: 50%;
		transform: translate(50%, -50%) rotate(-45deg);
		background: var(--vscode-input-background);
	}
</style>
