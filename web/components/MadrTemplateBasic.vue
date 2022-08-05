<template>
	<div id="template">
		<TemplateTitleSection
			:titleProp="title"
			ref="title"
			v-model:title="title"
			@validate="validate('title')"
			:key="dataFetched"
		></TemplateTitleSection>
		<hr />
		<TemplateContextAndProblemStatementSection
			:contextAndProblemStatementProp="contextAndProblemStatement"
			ref="contextAndProblemStatement"
			v-model:contextAndProblemStatement="contextAndProblemStatement"
			@validate="validate('contextAndProblemStatement')"
			:key="dataFetched"
		></TemplateContextAndProblemStatementSection>
		<hr />
		<TemplateConsideredOptionsBasicSection
			:consideredOptionsProp="consideredOptions"
			ref="consideredOptions"
			v-model:consideredOptions="consideredOptions"
			v-model:chosenOption="decisionOutcome.chosenOption"
			v-model:selectedIndex="selectedIndex"
			@addOption="addOption"
			@selectOption="selectOption"
			@editOption="editOption"
			@deleteOption="deleteOption"
			@checkSelection="checkSelection"
			:key="dataFetched"
		></TemplateConsideredOptionsBasicSection>
		<hr />
		<TemplateDecisionOutcomeBasicSection
			:decisionOutcomeProp="decisionOutcome"
			ref="decisionOutcome"
			v-model:explanation="decisionOutcome.explanation"
			@validate="validate('explanation')"
			:key="dataFetched"
		></TemplateDecisionOutcomeBasicSection>
	</div>
</template>

<script lang="ts">
	// Mixin defining all methods, variables etc. to hold the data of an ADR
	import adrData from "../mixins/adr-data";

	import { defineComponent } from "vue";
	import vscode from "../mixins/vscode-api-mixin";
	import TemplateTitleSection from "./TemplateTitleSection.vue";
	import TemplateContextAndProblemStatementSection from "./TemplateContextAndProblemStatementSection.vue";
	import TemplateConsideredOptionsBasicSection from "./TemplateConsideredOptionsBasicSection.vue";
	import TemplateDecisionOutcomeBasicSection from "./TemplateDecisionOutcomeBasicSection.vue";

	export default defineComponent({
		name: "MadrTemplateBasic",
		components: {
			TemplateTitleSection,
			TemplateContextAndProblemStatementSection,
			TemplateConsideredOptionsBasicSection,
			TemplateDecisionOutcomeBasicSection,
		},
		mixins: [vscode, adrData],
		mounted() {
			// add listeners to receive data from extension
			window.addEventListener("message", (event) => {
				const message = event.data;
				switch (message.command) {
					case "addOption":
						this.consideredOptions.push({ title: message.option, description: "", pros: [], cons: [] });
						if (this.consideredOptions.length === 1) {
							this.selectOption(0);
						}
						break;
					case "requestBasicOptionEdit":
						if (message.newTitle) {
							const oldTitle = this.consideredOptions[message.index].title;
							this.consideredOptions[message.index].title = message.newTitle;
							if (this.decisionOutcome.chosenOption === oldTitle) {
								this.selectOption(message.index);
							}
						}
						break;
					case "fetchAdrValues":
						this.fillFields(JSON.parse(message.adr));
						break;
					case "saveSuccessful":
						this.fullPath = message.newPath;
						break;
				}
			});
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#template {
		width: 95%;
		height: auto;
		background: var(--vscode-textBlockQuote-background);
		border: 1.5px solid var(--vscode-input-foreground);
		margin: 1.5rem auto 0.5rem auto;
		padding: 1.5rem;
	}

	hr {
		margin-top: 2rem;
		margin-bottom: 2rem;
		border: 0.5px solid var(--vscode-input-foreground);
	}
</style>
