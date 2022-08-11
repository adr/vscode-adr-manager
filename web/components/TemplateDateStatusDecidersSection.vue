<template>
	<div id="date-status-deciders-container">
		<div class="input">
			<p>Last Updated:</p>
			<input
				type="date"
				id="date"
				:value="date"
				@input="
					$emit('update:date', $event.target.value);
					$emit('validate');
				"
			/>
			<div id="icon" class="tooltip">
				<div class="bottom">
					<p>The date where this ADR has been updated the last time.</p>
					<i></i>
				</div>
				<i class="codicon codicon-info"></i>
			</div>
		</div>
		<div class="input">
			<p>Status:</p>
			<select
				name="status"
				id="status"
				:value="status"
				@input="
					$emit('update:status', $event.target.value);
					$emit('validate');
				"
			>
				<option value="" selected></option>
				<option value="Proposed">Proposed</option>
				<option value="Accepted">Accepted</option>
				<option value="Rejected">Rejected</option>
				<option value="Superseded">Superseded</option>
			</select>
			<div id="icon" class="tooltip">
				<div class="bottom">
					<p>The current status of this ADR.</p>
					<i></i>
				</div>
				<i class="codicon codicon-info"></i>
			</div>
		</div>
		<div class="input">
			<p>Deciders:</p>
			<input
				type="text"
				id="deciders"
				spellcheck="true"
				:value="deciders"
				@input="
					$emit('update:deciders', $event.target.value);
					$emit('validate');
				"
			/>
			<div id="icon" class="tooltip">
				<div class="bottom">
					<p>Everyone involved in the decision, separated by commas.</p>
					<i></i>
				</div>
				<i class="codicon codicon-info"></i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "Templatedate-status-deciders-containerSection",
		props: {
			date: String,
			status: String,
			deciders: String,
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	body.vscode-dark #date {
		color-scheme: dark;
	}

	#date-status-deciders-container {
		@include centered-flex(row);
		width: 100%;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.input {
		@include centered-flex(row);
		& p {
			margin-right: 0.5rem;
		}
		margin-right: 2.5rem;
	}

	#date {
		flex: 1;
		border: 1px solid var(--vscode-input-foreground);
		border-radius: 5px;
		margin: 0.25rem;
	}

	#status {
		background: var(--vscode-input-background);
		color: var(--vscode-input-foreground);
		border: 1px solid var(--vscode-input-foreground);
		border-radius: 5px;
		flex: 1;
		padding: 0.5rem 0;
		margin: 0.25rem;
	}

	#deciders {
		flex: 1;
		border: 1px solid var(--vscode-input-foreground);
		margin: 0.25rem;
		border-radius: 5px;
	}

	.tooltip .bottom {
		min-width: 25rem;
		max-width: 50rem;
		top: 40px;
		left: 50%;
		margin-left: 20px;
		transform: translate(-50%, 0);
		padding: 10px 20px;
		background: var(--vscode-input-background);
		color: var(--vscode-descriptionForeground);
		border-radius: 5px;
		position: absolute;
		z-index: 99;
		box-sizing: border-box;
		display: none;
	}

	.tooltip .bottom p {
		white-space: pre-line;
	}

	.tooltip:hover {
		z-index: 2;
	}

	.tooltip:hover .bottom {
		display: block;
	}

	.tooltip .bottom i {
		position: absolute;
		bottom: 100%;
		left: 45%;
		margin-left: -15px;
		width: 24px;
		height: 12px;
		overflow: hidden;
	}

	.tooltip .bottom i::after {
		content: "";
		position: absolute;
		width: 12px;
		height: 12px;
		left: 45%;
		transform: translate(-45%, 50%) rotate(45deg);
		background: var(--vscode-input-background);
	}
</style>
