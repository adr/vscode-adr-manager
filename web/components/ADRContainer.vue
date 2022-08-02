<template>
	<div id="container">
		<div id="adrBox" :class="adr.adr.conforming ? 'conforming' : 'not-conforming'">
			<div class="adrInfo">
				<h3>{{ adr.adr.title ? adr.adr.title : "(No title)" }}</h3>
				<h5>
					<TT>{{ adr.relativePath }}</TT>
				</h5>
			</div>
			<div class="buttonGroup">
				<button id="view" :disabled="!adr.adr.conforming" @click="$emit('requestView')">View</button>
				<button id="delete" @click="$emit('requestDelete')">Delete</button>
			</div>
		</div>
		<h4 v-if="!adr.adr.conforming" class="not-conforming-message">
			Does not conform to MADR; please edit the Markdown file such that it conforms to MADR.
		</h4>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		name: "ADRContainer",
		props: {
			adr: {
				type: Object,
				required: true,
			},
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#adrBox {
		@include centered-flex(row);
		width: 100%;
		justify-content: space-between;
		margin: 1rem 0;
		padding: 0 1rem;
		background: var(--vscode-textBlockQuote-background);
	}

	.adrInfo {
		& h3 {
			margin-top: 10px;
		}
		& h5 {
			margin-bottom: 10px;
		}
	}

	.conforming {
		border: 1.5px solid var(--vscode-descriptionForeground);
	}

	.not-conforming {
		border: 1.5px solid var(--vscode-editorError-foreground);
	}

	.not-conforming-message {
		color: var(--vscode-editorError-foreground);
		margin: -1rem 0 1rem 0;
	}

	.buttonGroup {
		@include centered-flex(row);
	}

	button {
		margin: 1rem;
		padding: 0.5rem 1rem;
		width: fit-content;
		min-width: 73px;
		@include button-styling;

		&#delete {
			background: var(--vscode-editorError-foreground);
		}
		&#view {
			background: var(--vscode-button-background);
		}
		&:disabled {
			filter: brightness(50%);
			cursor: default;
		}
	}
</style>
