<template>
	<div id="template">
		<div id="title" class="inputGroup">
			<TemplateHeader
				:name="'Title'"
				:infoText="'Describe the solved problem and the solution concisely.\n\nThe title is also used as the file name, so keep it short and avoid using special characters.'"
			></TemplateHeader>
			<input type="text" />
		</div>
		<hr />
		<div id="contextAndProblemStatement" class="inputGroup">
			<TemplateHeader
				:name="'Context and Problem Statement'"
				:infoText="'Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.\nYou may want to articulate the problem in form of a question.'"
			></TemplateHeader>
			<textarea id="autoGrow" />
		</div>
		<hr />
		<div id="consideredOptions">
			<TemplateHeader
				:name="'Considered Options'"
				:infoText="'List of all considered options.\nOnly write a concise description; you can add a more detailed description when using the Long ADR template.'"
			></TemplateHeader>
		</div>
		<hr />
		<div id="decisionOutcome">
			<TemplateHeader
				:name="'Decision Outcome'"
				:infoText="'Select the option that you chose to use.\nYou can add consequences when using the Long ADR template.'"
			></TemplateHeader>
			<div id="explanation">
				<h3>because</h3>
				<input type="text" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import TemplateHeader from "./TemplateHeader.vue";

	export default defineComponent({
		name: "MadrTemplateShort",
		components: {
			TemplateHeader,
		},
		mounted() {
			// Auto-grow textarea of Context and Problem Statement
			const textarea = document.getElementById("autoGrow")!;
			textarea.addEventListener("input", () => {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
			});
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins.scss" as *;

	body.vscode-high-contrast {
		& input,
		textarea {
			border: 1px solid var(--vscode-contrastBorder);
		}
	}

	#template {
		width: 100%;
		height: auto;
		background: var(--vscode-textBlockQuote-background);
		border: 1px solid var(--vscode-input-foreground);
		margin: 1.5rem 1rem;
		padding: 1.5rem;
	}

	hr {
		margin-bottom: 2rem;
		border: 0.5px solid var(--vscode-input-foreground);
	}

	.inputGroup {
		margin-bottom: 1.5rem;

		& input {
			height: 3rem;
		}

		&#contextAndProblemStatement textarea {
			min-height: 6rem;
			resize: none;
			overflow-y: hidden;
		}
	}

	#explanation {
		display: flex;
		flex-direction: row;
		align-items: center;

		& h3 {
			margin-right: 2rem;
		}
	}
</style>
