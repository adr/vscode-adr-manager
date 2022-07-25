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
			<div id="optionsHeader">
				<TemplateHeader
					:name="'Considered Options'"
					:infoText="'List of all considered options.\nClick to select an option, rearrange options by drag and drop.\nOnly write a concise description; you can add a more detailed description when using the Professional MADR template.'"
				></TemplateHeader>
				<AddOptionButton @addOption="addOption" draggable="false"></AddOptionButton>
			</div>
			<div id="options">
				<draggable class="dragArea" :list="consideredOptions" :sort="true">
					<OptionContainerBasic
						v-for="(option, index) in consideredOptions"
						:key="index"
						:title="option.title"
						:class="option.title === chosenOption ? 'selectedOption' : 'unselectedOption'"
						@selectOption="selectOption(index)"
						@editOption="editOption(option.title, index)"
						@deleteOption="deleteOption(index)"
					></OptionContainerBasic>
				</draggable>
			</div>
		</div>
		<hr />
		<div id="decisionOutcome">
			<TemplateHeader
				:name="'Decision Outcome'"
				:infoText="'Add an explanation for the chosen option.\nYou can add consequences when using the Professional MADR template.'"
			></TemplateHeader>
			<h3 id="chosenOptionText">
				Chosen Option: <b>{{ chosenOptionText }}</b>
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
	import { VueDraggableNext } from "vue-draggable-next";
	import TemplateHeader from "./TemplateHeader.vue";
	import OptionContainerBasic from "./OptionContainerBasic.vue";
	import AddOptionButton from "./AddOptionButton.vue";
	import { createShortTitle } from "../../src/plugins/utils";

	export default defineComponent({
		name: "MadrTemplateBasic",
		components: {
			TemplateHeader,
			OptionContainerBasic,
			AddOptionButton,
			draggable: VueDraggableNext,
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
				oldTitle: "",
				contextAndProblemStatement: "",
				consideredOptions: [] as {
					title: string;
					description: string;
					pros: string[];
					cons: string[];
				}[],
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
		computed: {
			chosenOptionText() {
				return this.chosenOption !== "" ? createShortTitle(this.chosenOption) : "none";
			},
		},
		methods: {
			/**
			 * Fills the fields with the existing values of the ADR.
			 */
			fillFields(adr: {
				title: string;
				contextAndProblemStatement: string;
				consideredOptions: {
					title: string;
					description: string;
					pros: string[];
					cons: string[];
				}[];
				chosenOption: string;
				explanation: string;
			}) {
				this.title = adr.title;
				this.oldTitle = adr.title;
				this.contextAndProblemStatement = adr.contextAndProblemStatement;
				this.consideredOptions = adr.consideredOptions;
				this.chosenOption = adr.chosenOption;
				this.explanation = adr.explanation;
				this.selectOption(
					this.consideredOptions.findIndex((option) => {
						return createShortTitle(option.title) === createShortTitle(this.chosenOption);
					})
				);
				this.v$.$validate();
				this.validateAll();
			},
			/**
			 * Handles the selection of options using clicks and validates that an option has been chosen.
			 * @param index The index of the clicked option
			 */
			selectOption(index: number) {
				this.selectedIndex = index;
				if (index !== -1) {
					this.chosenOption = this.consideredOptions[this.selectedIndex].title;
				} else {
					this.chosenOption = "";
				}
				this.validate("consideredOptions");
				this.validate("chosenOption");
			},
			/**
			 * Updates the selected option after an option has been deleted from the list of considered
			 * options.
			 * @param originalIndex The original index of the deleted option (before deletion)
			 */
			selectOptionAfterDeletion(originalIndex: number) {
				// check if selected option has been deleted
				if (originalIndex === this.selectedIndex) {
					// unselect any option such that the user has to actively select a new option
					this.selectOption(-1);
				} else if (originalIndex < this.selectedIndex) {
					// shift selected index by -1 if the deleted option came before the selected option
					this.selectOption(this.selectedIndex - 1);
				}
			},
			/**
			 * Sends a message to the extension to promt the user to enter a new name for the option.
			 * @param index The index of the option to edit
			 */
			editOption(option: string, index: number) {
				this.sendMessage("requestBasicOptionEdit", { currentTitle: option, index: index });
			},
			/**
			 * Removes the considered option with the specified index from the list of considered options
			 * and selects another option in the list of considered options.
			 * @param index The index of the option to be deleted
			 */
			deleteOption(index: number) {
				this.consideredOptions.splice(index, 1);
				this.selectOptionAfterDeletion(index);
			},
			/**
			 * Sends a message to the extension to ask the user for a title when adding a new option.
			 */
			addOption() {
				this.sendMessage("addOptionBasic");
			},
			/**
			 * Validates every field of the ADR.
			 */
			validateAll() {
				this.validate("title");
				this.validate("contextAndProblemStatement");
				this.validate("consideredOptions");
				this.validate("chosenOption");
				this.validate("explanation");
			},
			/**
			 * Validates a specified field of the ADR and sets a flag for each field.
			 * The user can click on the "Create ADR" button iff all fields are valid,
			 * i.e. iff all properties of this.valid have the value true.
			 * @param field The ADR field to be validated
			 */
			validate(field: string) {
				switch (field) {
					case "title":
						//@ts-ignore
						if (!this.v$.title.$error) {
							this.valid.title = true;
						} else {
							this.valid.title = false;
						}
						break;
					case "contextAndProblemStatement":
						//@ts-ignore
						if (!this.v$.contextAndProblemStatement.$error) {
							this.valid.contextAndProblemStatement = true;
						} else {
							this.valid.contextAndProblemStatement = false;
						}
						break;
					case "consideredOptions":
						if (
							//@ts-ignore
							!this.v$.consideredOptions.$error &&
							this.consideredOptions[this.selectedIndex].title === this.chosenOption
						) {
							this.valid.consideredOptions = true;
						} else {
							this.valid.consideredOptions = false;
						}
						break;
					case "chosenOption":
						if (
							//@ts-ignore
							!this.v$.chosenOption.$error &&
							this.chosenOption !== ""
						) {
							this.valid.chosenOption = true;
						} else {
							this.valid.chosenOption = false;
						}
						break;
					case "explanation":
						//@ts-ignore
						if (!this.v$.explanation.$error) {
							this.valid.explanation = true;
						} else {
							this.valid.explanation = false;
						}
						break;
				}
				this.activateAddButton();
			},
			/**
			 * Enables the "Create ADR" button iff all fields are valid, i.e. every property of
			 * this.valid has a value of true.
			 */
			activateAddButton() {
				if (Object.values(this.valid).every((value) => value)) {
					this.$emit("validated", {
						title: this.title,
						oldTitle: this.oldTitle,
						contextAndProblemStatement: this.contextAndProblemStatement,
						consideredOptions: this.consideredOptions,
						chosenOption: createShortTitle(this.chosenOption),
						explanation: this.explanation,
					});
				} else {
					this.$emit("invalidated");
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
			// add listener to receive option title from user input
			window.addEventListener("message", (event) => {
				const message = event.data;
				switch (message.command) {
					case "addOptionBasic":
						this.consideredOptions.push({ title: message.option, description: "", pros: [], cons: [] });
						if (this.consideredOptions.length === 1) {
							this.selectOption(0);
						}
						break;
					case "requestBasicOptionEdit":
						if (message.newTitle) {
							this.consideredOptions[message.index].title = message.newTitle;
						}
						break;
					case "fetchAdrValues":
						this.fillFields(JSON.parse(message.adr));
						break;
					case "saveSuccessful":
						this.oldTitle = this.title;
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
			border: 1.5px solid var(--vscode-contrastBorder);
		}
	}

	#template {
		width: 100%;
		height: auto;
		background: var(--vscode-textBlockQuote-background);
		border: 1.5px solid var(--vscode-input-foreground);
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

	#optionsHeader {
		display: flex;
	}

	#options {
		@include centered-flex(row);
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.dragArea {
		display: flex;
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
		border: 1.5px solid green !important;
		outline-color: green !important;
	}

	.invalidInput,
	.invalidInput:focus {
		border: 1.5px solid var(--vscode-editorError-foreground) !important;
		outline-color: var(--vscode-editorError-foreground) !important;
	}

	.errorMessage {
		color: var(--vscode-editorError-foreground);
	}
</style>
