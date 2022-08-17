<template>
	<div id="template">
		<TemplateTitleSection
			:titleProp="title"
			ref="title"
			v-model:title="title"
			@validate="validate('title')"
			:key="dataFetched"
		></TemplateTitleSection>
		<TemplateDateStatusDecidersSection
			v-model:date="date"
			v-model:status="status"
			v-model:deciders="deciders"
			@validate="validateAll"
			:key="dataFetched"
		></TemplateDateStatusDecidersSection>
		<TemplateTechnicalStorySection
			v-model:technicalStory="technicalStory"
			@validate="validateAll"
			:key="dataFetched"
		></TemplateTechnicalStorySection>
		<hr />
		<TemplateContextAndProblemStatementSection
			:contextAndProblemStatementProp="contextAndProblemStatement"
			ref="contextAndProblemStatement"
			v-model:contextAndProblemStatement="contextAndProblemStatement"
			@validate="validate('contextAndProblemStatement')"
			:key="dataFetched"
		></TemplateContextAndProblemStatementSection>
		<hr />
		<TemplateDecisionDriversSection
			:decisionDriversProp="decisionDrivers"
			v-model:decisionDrivers="decisionDrivers"
			@update:decisionDrivers="validateAll"
			:key="dataFetched"
		></TemplateDecisionDriversSection>
		<hr />
		<TemplateConsideredOptionsProfessionalSection
			:consideredOptionsProp="consideredOptions"
			ref="consideredOptions"
			v-model:consideredOptions="consideredOptions"
			v-model:chosenOption="decisionOutcome.chosenOption"
			v-model:selectedIndex="selectedIndex"
			@addOption="addOption"
			@selectOption="selectOption"
			@deleteOption="deleteOption"
			@checkSelection="checkSelection"
			:key="dataFetched"
		></TemplateConsideredOptionsProfessionalSection>
		<hr />
		<TemplateDecisionOutcomeProfessionalSection
			:decisionOutcomeProp="decisionOutcome"
			ref="decisionOutcome"
			v-model:explanation="decisionOutcome.explanation"
			v-model:positiveConsequences="decisionOutcome.positiveConsequences"
			v-model:negativeConsequences="decisionOutcome.negativeConsequences"
			@validate="validate('explanation')"
			@updateArray="validateAll"
			:key="dataFetched"
		></TemplateDecisionOutcomeProfessionalSection>
		<hr />
		<TemplateLinksSection
			:linksProp="links"
			v-model:links="links"
			@update:links="validateAll"
			:key="dataFetched"
		></TemplateLinksSection>
	</div>
</template>

<script lang="ts">
	// Mixin defining all methods, variables etc. to hold the data of an ADR
	import adrData from "../mixins/adr-data";

	import { defineComponent } from "vue";
	import vscode from "../mixins/vscode-api-mixin";
	import TemplateDateStatusDecidersSection from "./TemplateDateStatusDecidersSection.vue";
	import TemplateTitleSection from "./TemplateTitleSection.vue";
	import TemplateTechnicalStorySection from "./TemplateTechnicalStorySection.vue";
	import TemplateContextAndProblemStatementSection from "./TemplateContextAndProblemStatementSection.vue";
	import TemplateDecisionDriversSection from "./TemplateDecisionDriversSection.vue";
	import TemplateConsideredOptionsProfessionalSection from "./TemplateConsideredOptionsProfessionalSection.vue";
	import TemplateDecisionOutcomeProfessionalSection from "./TemplateDecisionOutcomeProfessionalSection.vue";
	import TemplateLinksSection from "./TemplateLinksSection.vue";

	export default defineComponent({
		name: "MadrTemplateProfessional",
		components: {
			TemplateDateStatusDecidersSection,
			TemplateTitleSection,
			TemplateTechnicalStorySection,
			TemplateContextAndProblemStatementSection,
			TemplateDecisionDriversSection,
			TemplateConsideredOptionsProfessionalSection,
			TemplateDecisionOutcomeProfessionalSection,
			TemplateLinksSection,
		},
		mixins: [vscode, adrData],
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#template {
		width: 95%;
		height: auto;
		background: var(--vscode-textBlockQuote-background);
		border: 1.5px solid var(--vscode-input-foreground);
		margin: 1.5rem auto;
		padding: 1.5rem;
	}

	hr {
		margin-top: 2rem;
		margin-bottom: 2rem;
		border: 0.5px solid var(--vscode-input-foreground);
	}
</style>
