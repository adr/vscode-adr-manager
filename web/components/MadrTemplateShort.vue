<template>
	<div id="template">
		<div id="title" class="inputGroup">
			<TemplateHeader
				:name="'Title'"
				:infoText="'Describe the solved problem and the solution concisely.\n\nThe title is also used as the file name, so keep it short and avoid using special characters.'"
			></TemplateHeader>
			<input
				type="text"
				:class="v$.title.$error ? 'invalidInput' : v$.title.$dirty ? 'validInput' : ''"
				v-model="v$.title.$model"
				@input="validate('title')"
			/>
			<h4 class="errorMessage" v-for="error of v$.title.$errors" :key="error.$uid">{{ error.$message }}</h4>
		</div>
		<hr />
		<div id="contextAndProblemStatement" class="inputGroup">
			<TemplateHeader
				:name="'Context and Problem Statement'"
				:infoText="'Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.\nYou may want to articulate the problem in form of a question.'"
			></TemplateHeader>
			<textarea
				id="autoGrow"
				:class="
					v$.contextAndProblemStatement.$error
						? 'invalidInput'
						: v$.contextAndProblemStatement.$dirty
						? 'validInput'
						: ''
				"
				v-model="v$.contextAndProblemStatement.$model"
				@input="validate('contextAndProblemStatement')"
			/>
			<h4 class="errorMessage" v-for="error of v$.contextAndProblemStatement.$errors" :key="error.$uid">
				{{ error.$message }}
			</h4>
		</div>
		<hr />
		<div id="consideredOptions">
			<TemplateHeader
				:name="'Considered Options'"
				:infoText="'List of all considered options.\nClick to select an option.\nOnly write a concise description; you can add a more detailed description when using the Long ADR template.'"
			></TemplateHeader>
			<div id="options">
				<OptionContainerShort
					v-for="(option, index) in consideredOptions"
					:key="index"
					:title="option"
					:class="selectedIndex === index ? 'selectedOption' : 'unselectedOption'"
					@click="selectOption(index)"
				></OptionContainerShort>
				<AddOptionButton @click="addOption"></AddOptionButton>
			</div>
		</div>
		<hr />
		<div id="decisionOutcome">
			<TemplateHeader
				:name="'Decision Outcome'"
				:infoText="'Add an explanation for the chosen option.\nYou can add consequences when using the Long ADR template.'"
			></TemplateHeader>
			<h3 id="chosenOptionText">
				Chosen Option: <b>{{ chosenOption === "" ? "none" : chosenOption }}</b>
			</h3>
			<div id="explanation">
				<h3>because</h3>
				<div id="explanationInput">
					<input
						type="text"
						:class="v$.explanation.$error ? 'invalidInput' : v$.explanation.$dirty ? 'validInput' : ''"
						v-model="v$.explanation.$model"
						@input="validate('explanation')"
					/>
					<h4 class="errorMessage" v-for="error of v$.explanation.$errors" :key="error.$uid">
						{{ error.$message }}
					</h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import vscode from "../../src/plugins/vscode-api-mixin";
	import useValidate from "@vuelidate/core";
	import { required } from "@vuelidate/validators";
	import TemplateHeader from "./TemplateHeader.vue";
	import OptionContainerShort from "./OptionContainerShort.vue";
	import AddOptionButton from "./AddOptionButton.vue";

	export default defineComponent({
		name: "MadrTemplateShort",
		components: {
			TemplateHeader,
			OptionContainerShort,
			AddOptionButton,
		},
		mixins: [vscode],
		setup() {
			return {
				v$: useValidate(),
			};
		},
		data() {
			return {
				title: "",
				contextAndProblemStatement: "",
				consideredOptions: [] as string[],
				chosenOption: "",
				explanation: "",
				selectedIndex: -1,
				valid: {
					title: false,
					contextAndProblemStatement: false,
					consideredOptions: false,
					chosenOption: false,
					explanation: false,
				},
			};
		},
		methods: {
			selectOption(index: number) {
				this.selectedIndex = index;
				this.chosenOption = this.consideredOptions[this.selectedIndex];
				this.validate("consideredOptions");
				this.validate("chosenOption");
			},
			addOption() {
				this.sendMessage("addOptionShort");
			},
			validate(field: string) {
				switch (field) {
					case "title":
						//@ts-ignore
						if (!this.v$.title.$error) {
							this.valid.title = true;
						}
						break;
					case "contextAndProblemStatement":
						//@ts-ignore
						if (!this.v$.contextAndProblemStatement.$error) {
							this.valid.contextAndProblemStatement = true;
						}
						break;
					case "consideredOptions":
						//@ts-ignore
						if (!this.v$.consideredOptions.$error) {
							this.valid.consideredOptions = true;
						}
						break;
					case "chosenOption":
						//@ts-ignore
						if (!this.v$.chosenOption.$error) {
							this.valid.chosenOption = true;
						}
						break;
					case "explanation":
						//@ts-ignore
						if (!this.v$.explanation.$error) {
							this.valid.explanation = true;
						}
						break;
				}
				this.activateAddButton();
			},
			activateAddButton() {
				if (Object.values(this.valid).every((value) => value)) {
					this.$emit("validated", {
						title: this.title,
						contextAndProblemStatement: this.contextAndProblemStatement,
						consideredOptions: this.consideredOptions,
						chosenOption: this.chosenOption,
						explanation: this.explanation,
					});
				}
			},
		},
		mounted() {
			// Auto-grow textarea of Context and Problem Statement
			const textarea = document.getElementById("autoGrow")!;
			textarea.addEventListener("input", () => {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
			});
			window.addEventListener("message", (event) => {
				const message = event.data;
				switch (message.command) {
					case "addOptionShort":
						this.consideredOptions.push(message.option);
						if (this.consideredOptions.length === 1) {
							this.selectOption(0);
						}
						break;
				}
			});
		},
		validations() {
			return {
				title: {
					required,
					$lazy: true,
				},
				contextAndProblemStatement: {
					required,
					$lazy: true,
				},
				consideredOptions: {
					required,
					$lazy: true,
				},
				chosenOption: {
					required,
					$lazy: true,
				},
				explanation: {
					required,
					$lazy: true,
				},
			};
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

	#options {
		@include centered-flex(row);
		justify-content: start;
		flex-wrap: wrap;
	}

	.selectedOption {
		background: var(--vscode-editor-selectionBackground);
		& h3 {
			color: var(--vscode-editor-selectionForeground) !important;
		}
	}

	.unselectedOption {
		background: var(--vscode-editor-background);
	}

	#chosenOptionText {
		margin-top: 2rem;
	}

	#explanation {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		margin-top: 1.5rem;
		& h3 {
			margin-right: 2rem;
		}
	}

	#explanationInput {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.validInput,
	.validInput:focus {
		border: 1px solid green !important;
		outline-color: green !important;
	}

	.invalidInput,
	.invalidInput:focus {
		border: 1px solid var(--vscode-editorError-foreground) !important;
		outline-color: var(--vscode-editorError-foreground) !important;
	}

	.errorMessage {
		color: var(--vscode-editorError-foreground);
	}
</style>
