<template>
	<div id="home">
		<img src="../assets/logo-dark-theme.png" alt="ADR Manager Logo" class="logo" v-if="!isLightTheme" />
		<img src="../assets/logo-light-theme.png" alt="ADR Manager Logo" class="logo" v-if="isLightTheme" />
		<div id="adrList">
			<ADRContainer v-for="(adr, index) in sortedAdrs" :key="index" :adr="adr"> </ADRContainer>
		</div>
		<button id="addAdrButton">Add ADR</button>
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
				allAdrs: [] as { adr: ArchitecturalDecisionRecord; path: string; fileName: string }[],
			};
		},
		computed: {
			sortedAdrs() {
				return this.allAdrs.sort(
					(
						a: { adr: ArchitecturalDecisionRecord; path: string; fileName: string },
						b: { adr: ArchitecturalDecisionRecord; path: string; fileName: string }
					) => {
						return a.fileName.localeCompare(b.fileName, undefined, { numeric: true });
					}
				);
			},
			isLightTheme() {
				return document.body.classList.contains("vscode-light");
			},
		},
		methods: {
			async fetchAdrs() {
				this.sendMessage("fetchAdrs");
			},
		},
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

	#home {
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
		width: 80%;
		min-height: 40%;
		max-height: 60%;
		overflow: scroll;
		margin: 1rem;
	}

	#addAdrButton {
		width: 20%;
		min-height: 3rem;
		background: green;
		margin: 0.5rem 0 2rem 0;
		@include button-styling;
	}
</style>
