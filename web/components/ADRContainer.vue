<template>
	<div id="container">
		<div id="adr-box" :class="adr.adr.conforming ? 'conforming' : 'not-conforming'">
			<div class="adr-info">
				<h3>{{ adr.adr.title ? getAdrNumber + ": " + adr.adr.title : "(No title)" }}</h3>
				<h5>
					<TT>{{ adr.relativePath }}</TT>
				</h5>
			</div>
			<div class="button-group">
				<button id="view" v-if="adr.adr.conforming" @click="$emit('requestView')">View</button>
				<button id="edit" v-else @click="$emit('requestEdit')">Edit</button>
				<button id="delete" @click="$emit('requestDelete')">Delete</button>
			</div>
		</div>
		<h4 v-if="!adr.adr.conforming" class="not-conforming-message" v-for="error in adr.adr.parseErrors">
			{{ "Line " + error.line + ", Position " + error.charPosition + ": " + error.message }}
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
		computed: {
			/**
			 * Returns the number of the ADR.
			 */
			getAdrNumber() {
				return `#${this.adr.fileName.substring(0, 4)}`;
			},
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#adr-box {
		@include centered-flex(row);
		width: 100%;
		justify-content: space-between;
		margin: 1rem 0;
		padding: 0 1rem;
		background: var(--vscode-textBlockQuote-background);
	}

	.adr-info {
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
		margin: -1rem 0 1.5rem 0;
	}

	.button-group {
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
