<template>
	<div id="main">
		<img src="../assets/header-dark-theme.png" alt="ADR Manager Header Image" class="logo" />
		<div id="adrList">
			<ADRContainer
				v-for="(adr, index) in sortedAdrs"
				:key="index"
				:adr="adr"
				@requestDelete="requestDelete(adr)"
				@requestView="requestView(adr)"
			></ADRContainer>
		</div>
		<button id="addAdrButton" @click="sendMessage('add')">Add ADR</button>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import ADRContainer from "../components/ADRContainer.vue";
	import vscode from "../../src/plugins/vscode-api-mixin";
	import { ArchitecturalDecisionRecord } from "../../src/plugins/classes";

	export default defineComponent({
		components: {
			ADRContainer,
		},
		mixins: [vscode],
		data() {
			return {
				allAdrs: [] as {
					adr: ArchitecturalDecisionRecord;
					fullPath: string;
					relativePath: string;
					fileName: string;
				}[],
			};
		},
		computed: {
			/**
			 * Sorts the fetched ADRs by their filename such that the lowest-numbered ADR
			 * from all workspace folders is displayed at the top.
			 */
			sortedAdrs() {
				return this.allAdrs.sort(
					(
						a: {
							adr: ArchitecturalDecisionRecord;
							fullPath: string;
							relativePath: string;
							fileName: string;
						},
						b: {
							adr: ArchitecturalDecisionRecord;
							fullPath: string;
							relativePath: string;
							fileName: string;
						}
					) => {
						return a.fileName.localeCompare(b.fileName, undefined, { numeric: true });
					}
				);
			},
		},
		methods: {
			/**
			 * Passes a message to the extension to fetch the ADRs from all workspace folders.
			 */
			async fetchAdrs() {
				this.sendMessage("fetchAdrs");
			},
			requestDelete(adr: {
				adr: ArchitecturalDecisionRecord;
				fullPath: string;
				relativePath: string;
				fileName: string;
			}) {
				this.sendMessage("requestDelete", { title: adr.adr.title, fullPath: adr.fullPath });
			},
			requestView(adr: {
				adr: ArchitecturalDecisionRecord;
				fullPath: string;
				relativePath: string;
				fileName: string;
			}) {
				this.sendMessage("view", { fullPath: adr.fullPath });
			},
		},
		/**
		 * Sets up event listeners to receive messages and data from the extension, and fetch ADRs
		 * upon rendering the view.
		 */
		mounted() {
			window.addEventListener("message", (event) => {
				const message = event.data;
				switch (message.command) {
					case "fetchAdrs":
						this.allAdrs = message.adrs;
						break;
				}
			});
			this.fetchAdrs();
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins" as *;

	body {
		@include dynamic-logo;
	}

	#main {
		width: 100%;
		height: 100%;
		@include centered-flex(column);
		padding: 0;
		margin-top: 2rem;
	}

	.logo {
		width: 40%;
		height: auto;
		margin: 1rem 0;
	}

	#adrList {
		width: 90%;
		min-height: 40%;
		max-height: 60%;
		overflow: scroll;
		margin: 1rem;
	}

	#addAdrButton {
		@include button-sizing;
		@include button-styling;
		background: green;
		border: 1px solid var(--vscode-contrastBorder);
		margin: 0.5rem 0 2rem 0;
	}
</style>
