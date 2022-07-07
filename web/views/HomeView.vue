<template>
	<div id="home">
		<img src="../assets/logo-dark-theme.png" alt="ADR Manager Logo" id="logo" />
		<div id="adrList">
			<ADRContainer
				v-for="(adr, index) in allAdrs"
				:key="index"
				:adr="adr"
				:class="adr.conforming ? 'conforming' : 'not-conforming'"
			>
			</ADRContainer>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import ADRContainer from "../components/ADRContainer.vue";
	import vscode from "../../src/plugins/vscode-api-mixin";

	export default defineComponent({
		components: {
			ADRContainer,
		},
		mixins: [vscode],
		computed: {
			allAdrs() {
				return [
					{ title: "Use ADR Manager", conforming: true },
					{ title: "Not Conforming to MADR", conforming: false },
				];
			},
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins" as *;

	/* Change logo based on theme */
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
	}

	#home {
		width: 100%;
		height: 100%;
		@include centered-flex(column);
		overflow: visible;
		margin-top: 0;
	}

	#logo {
		width: 70%;
		height: auto;
		margin: 0 auto 2rem auto;
	}

	#adrList {
		width: 80%;
		max-height: 30%;
		margin: 1rem;
	}

	.conforming {
		background-color: var(--vscode-textBlockQuote-background);
	}

	.not-conforming {
		background-color: var(--vscode-editorWarning-foreground);
	}
</style>
