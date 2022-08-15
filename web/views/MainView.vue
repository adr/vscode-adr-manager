<template>
	<div id="main">
		<img src="../assets/header-dark-theme.png" alt="ADR Manager Header Image" class="logo" />
		<div id="adr-list">
			<div class="adr-folder" v-for="(folder, index) in nonEmptyWorkspaceFolders" :key="index">
				<h2>
					<strong>{{ folder }}</strong>
				</h2>
				<div class="adr-folder-list" v-for="(adr, adrIndex) in adrsInFolder(folder)" :key="adrIndex">
					<ADRContainer
						:key="index"
						:adr="adr"
						@requestDelete="requestDelete(adr)"
						@requestView="requestView(adr)"
						@requestEdit="requestEdit(adr)"
					></ADRContainer>
				</div>
			</div>
			<h1 v-if="!adrsAvailable">No ADRs detected in the workspace.</h1>
		</div>

		<button id="add-adr-button" @click="sendMessage('add')">Add ADR</button>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import ADRContainer from "../components/ADRContainer.vue";
	import vscode from "../mixins/vscode-api-mixin";
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
				workspaceFolders: [] as string[],
			};
		},
		computed: {
			/**
			 * Sorts the fetched ADRs by their filename such that the lowest-numbered ADR
			 * from all workspace folders is displayed at the top.
			 */
			sortedAdrs() {
				return this.allAdrs.sort((a, b) => {
					return (
						a.relativePath.localeCompare(b.relativePath) ||
						a.fileName.localeCompare(b.fileName, undefined, { numeric: true })
					);
				});
			},
			/**
			 * Returns an array of all workspace folders which contain at least one ADR.
			 */
			nonEmptyWorkspaceFolders() {
				return this.workspaceFolders.filter((folder) => {
					return this.adrsInFolder(folder).length > 0;
				});
			},
			/**
			 * Returns true iff the extension has detected at least one ADR.
			 */
			adrsAvailable() {
				return this.allAdrs.length > 0;
			},
		},
		methods: {
			/**
			 * Returns an array of ADRs that are located inside of the specified folder.
			 * @param folder The folder the ADRs should be located in
			 */
			adrsInFolder(folder: string) {
				return this.sortedAdrs.filter((adr) => {
					return adr.relativePath.includes(folder);
				});
			},
			/**
			 * Sends a message to the extension to open a text editor for the specified ADR file.
			 * @param adr The ADR for which a text editor will be opened
			 */
			requestEdit(adr: {
				adr: ArchitecturalDecisionRecord;
				fullPath: string;
				relativePath: string;
				fileName: string;
			}) {
				this.sendMessage("requestEdit", { fullPath: adr.fullPath });
			},
			/**
			 * Sends a message to the extension to initialize the deletion of the specified ADR file.
			 * @param adr The ADR to be deleted
			 */
			requestDelete(adr: {
				adr: ArchitecturalDecisionRecord;
				fullPath: string;
				relativePath: string;
				fileName: string;
			}) {
				this.sendMessage("requestDelete", { title: adr.adr.title, fullPath: adr.fullPath });
			},
			/**
			 * Sends a message to the extension to load the viewing webview with the content of the specified ADR file.
			 * @param adr The ADR to be openend in the ADR Manager webview
			 */
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
						this.allAdrs = JSON.parse(message.adrs);
						break;
					case "getWorkspaceFolders":
						this.workspaceFolders = JSON.parse(message.workspaceFolders);
						break;
				}
			});
			this.sendMessage("fetchAdrs");
			this.sendMessage("getWorkspaceFolders");
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/reset";
	@use "../static/vscode";
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

	#adr-list {
		width: 90%;
		min-height: 40%;
		max-height: 60%;
		overflow: scroll;
		margin: 1rem;

		& h1 {
			margin-top: 5rem;
			text-align: center;
		}
	}

	.adr-folder {
		margin-bottom: 2rem;
	}

	#add-adr-button {
		@include button-sizing;
		@include button-styling;
		background: green;
		border: 1px solid var(--vscode-contrastBorder);
		margin: 0.5rem 0 2rem 0;
	}
</style>
