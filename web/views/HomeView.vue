<template>
	<div id="home">
		<img src="../assets/logo-dark-theme.png" alt="ADR Manager Logo" class="logo" v-if="!isLightTheme" />
		<img src="../assets/logo-light-theme.png" alt="ADR Manager Logo" class="logo" v-if="isLightTheme" />
		<div id="adrList">
			<ADRContainer v-for="(adr, index) in allAdrs" :key="index" :adr="adr"> </ADRContainer>
		</div>
		<button id="addAdrButton">Add ADR</button>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import ADRContainer from "../components/ADRContainer.vue";
	import vscode from "../../src/plugins/vscode-api-mixin";
	import { md2adr } from "../../src/plugins/parser.js";
	import { ArchitecturalDecisionRecord } from "../../src/plugins/classes";
	//import { getAllAdrs } from "../../src/plugins/vscode-utils";

	export default defineComponent({
		components: {
			ADRContainer,
		},
		mixins: [vscode],
		data() {
			return {
				allAdrs: [] as ArchitecturalDecisionRecord[],
			};
		},
		computed: {
			isLightTheme() {
				return document.body.classList.contains("vscode-light");
			},
		},
		methods: {
			async fetchAdrs() {
				//let mds: string[] = await getAllAdrs();
				//mds.forEach((md) => this.allAdrs.push(md2adr(md)));
			},
		},
		mounted() {
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
