<template>
	<div id="home">
		<img src="../assets/logo-dark-theme.png" alt="ADR Manager Logo" class="logo" v-if="!isLightTheme" />
		<img src="../assets/logo-light-theme.png" alt="ADR Manager Logo" class="logo" v-if="isLightTheme" />
		<div id="adrList">
			<ADRContainer
				v-for="(adr, index) in validAdrs"
				:key="index"
				:adr="adr"
				:class="adr.title ? 'conforming' : 'not-conforming'"
			>
			</ADRContainer>
		</div>
		<button id="addAdrButton">Add ADR</button>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import ADRContainer from "../components/ADRContainer.vue";
	import vscode from "../../src/plugins/vscode-api-mixin";
	import { md2adr } from "../../src/plugins/parser.js";
	import { validMarkdownADRs } from "../../src/test/constants";
	import { ArchitecturalDecisionRecord } from "../../src/plugins/classes";

	export default defineComponent({
		components: {
			ADRContainer,
		},
		mixins: [vscode],
		data() {
			return {
				validMDs: validMarkdownADRs,
				validAdrs: [] as ArchitecturalDecisionRecord[],
			};
		},
		computed: {
			isLightTheme() {
				return document.body.classList.contains("vscode-light");
			},
		},
		methods: {
			fetchAdrs() {
				let parsedAdrs: ArchitecturalDecisionRecord[] = [];
				this.validMDs.forEach((md) => parsedAdrs.push(md2adr(md)));
				this.validAdrs = parsedAdrs;
			},
		},
		mounted() {
			this.fetchAdrs();
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins" as *;

	/* Change logo based on theme 
	body {
		$dark-theme-logo: url("../web/assets/logo-dark-theme.png");
		$light-theme-logo: url("../web/assets/logo-light-theme.png");

		&.vscode-light {
			#logo {
				content: $light-theme-logo;
			}
		}

		&.vscode-dark {
			#logo {
				content: $dark-theme-logo;
			}
		}
	} */

	#home {
		width: 100%;
		height: 100%;
		@include centered-flex(column);
		padding: 0;
		margin-top: 2rem;
	}

	.logo {
		width: 50%;
		height: auto;
		margin-bottom: 2rem;
	}

	#adrList {
		width: 80%;
		max-height: 20rem;
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

	.conforming {
		background-color: var(--vscode-textBlockQuote-background);
	}

	.not-conforming {
		background-color: var(--vscode-editorWarning-foreground);
	}
</style>
