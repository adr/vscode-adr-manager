<!-- TODO: Make all lists draggable -->
<!-- TODO: Create separate components for all template sections -->
<template>
	<div id="template">
		<div id="title" class="inputGroup">
			<TemplateHeader
				:infoText="'Describe the solved problem and the solution concisely.\n\nThe title is also used as the file name, so keep it short and avoid using special characters.'"
			>
				<h2>Title</h2>
			</TemplateHeader>
			<input
				type="text"
				:class="v$.title.$error ? 'invalidInput' : v$.title.$dirty ? 'validInput' : ''"
				v-model="v$.title.$model"
				@input="validate('title')"
			/>
			<h4 class="errorMessage" v-for="error of v$.title.$errors" :key="error.$uid">{{ error.$message }}</h4>
		</div>
		<TemplateDateStatusDeciders
			v-model:date="date"
			v-model:status="status"
			v-model:deciders="deciders"
		></TemplateDateStatusDeciders>
		<div id="technicalStory" class="inputGroup">
			<TemplateHeader :infoText="'Technical context of the ADR, e.g., a ticket or issue URL'">
				<h2>Technical Story</h2>
			</TemplateHeader>
			<input type="text" v-model="technicalStory" @input="validateAll" />
		</div>
		<hr />
		<div id="contextAndProblemStatement" class="inputGroup">
			<TemplateHeader
				:infoText="'Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.\nYou may want to articulate the problem in form of a question.'"
			>
				<h2>Context and Problem Statement</h2>
			</TemplateHeader>
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
		<div id="decisionDrivers" class="inputGroup">
			<TemplateHeader
				:infoText="'Decision Drivers are competing forces or facing concerns that influence the decision.'"
			>
				<h2>Decision Drivers</h2>
			</TemplateHeader>
			<div v-for="(driver, index) in decisionDriversWithBlank" :key="index" class="multiInput">
				<input
					v-model="decisionDrivers[index]"
					@input="updateArray('decisionDrivers', $event.target.value, index)"
				/>
				<i
					id="multiInputDeleteIcon"
					class="codicon codicon-close"
					v-if="decisionDrivers[index] !== ''"
					@click="updateArray('decisionDrivers', '', index)"
				></i>
			</div>
		</div>
		<hr />
		<div id="consideredOptions">
			<div id="optionsHeader">
				<TemplateHeader
					:infoText="'List of all considered options.\nClick to select an option, rearrange options by drag and drop.'"
				>
					<h2>Considered Options</h2>
				</TemplateHeader>
				<AddOptionButton @addOption="addOption" draggable="false"></AddOptionButton>
			</div>
			<div id="options">
				<draggable
					class="dragArea"
					:list="consideredOptions"
					:sort="true"
					handle="#grabber"
					item-key="title"
					@update="checkSelection"
				>
					<OptionContainerProfessional
						v-for="(option, index) in consideredOptions"
						:key="option"
						v-model:title="option.title"
						v-model:description="option.description"
						v-model:pros="option.pros"
						v-model:cons="option.cons"
						:class="option.title === decisionOutcome.chosenOption ? 'selectedOption' : 'unselectedOption'"
						@selectOption="selectOption(index)"
						@deleteOption="deleteOption(index)"
						@update:title="if (selectedIndex === index) selectOption(index);"
					></OptionContainerProfessional>
				</draggable>
				<h4 v-if="consideredOptions.length >= 2">
					<i>Click to choose an option; rearrange options with drag & drop.</i>
				</h4>
			</div>
		</div>
		<hr />
		<div id="decisionOutcome">
			<TemplateHeader :infoText="'Add an explanation for the chosen option.'">
				<h2>Decision Outcome</h2>
			</TemplateHeader>
			<h3 id="chosenOptionText">
				Chosen Option: <b>{{ chosenOptionText }}</b>
			</h3>
			<div id="explanation">
				<h3>because</h3>
				<div id="explanationInput" class="inputGroup">
					<input
						type="text"
						:class="
							v$.decisionOutcome.explanation.$error
								? 'invalidInput'
								: v$.decisionOutcome.explanation.$dirty
								? 'validInput'
								: ''
						"
						v-model="v$.decisionOutcome.explanation.$model"
						@input="validate('explanation')"
					/>
					<h4 class="errorMessage" v-for="error of v$.decisionOutcome.explanation.$errors" :key="error.$uid">
						{{ error.$message }}
					</h4>
				</div>
			</div>
			<div id="consequences">
				<div id="positiveConsequences">
					<TemplateHeader
						:infoText="'Give positive consequences, e.g., improvement of a quality attribute, follow-up decisions required, ...'"
					>
						<h3>Positive Consequences</h3>
					</TemplateHeader>
					<div
						v-for="(positive, index) in positiveConsequencesWithBlank"
						:key="index"
						class="multiInput"
						id="positives"
					>
						<input
							v-model="decisionOutcome.positiveConsequences[index]"
							@input="updateArray('positiveConsequences', $event.target.value, index)"
						/>
						<i
							id="multiInputDeleteIcon"
							class="codicon codicon-close"
							v-if="decisionOutcome.positiveConsequences[index] !== ''"
							@click="updateArray('positiveConsequences', '', index)"
						></i>
					</div>
				</div>
				<div id="negativeConsequences">
					<TemplateHeader
						:infoText="'Give negative consequences, e.g., afflicted quality attributes, follow-up decisions required, ...'"
					>
						<h3>Negative Consequences:</h3>
					</TemplateHeader>
					<div
						v-for="(negative, index) in negativeConsequencesWithBlank"
						:key="index"
						class="multiInput"
						id="negatives"
					>
						<input
							v-model="decisionOutcome.negativeConsequences[index]"
							@input="updateArray('negativeConsequences', $event.target.value, index)"
						/>
						<i
							id="multiInputDeleteIcon"
							class="codicon codicon-close"
							v-if="decisionOutcome.negativeConsequences[index] !== ''"
							@click="updateArray('negativeConsequences', '', index)"
						></i>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<div id="links" class="inputGroup">
			<TemplateHeader :infoText="'Add references, e.g., to related ADRs.'">
				<h2>Links</h2>
			</TemplateHeader>
			<div v-for="(link, index) in linksWithBlank" :key="index" class="multiInput">
				<input v-model="links[index]" @input="updateArray('links', $event.target.value, index)" />
				<i
					id="multiInputDeleteIcon"
					class="codicon codicon-close"
					v-if="links[index] !== ''"
					@click="updateArray('links', '', index)"
				></i>
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
	import TemplateDateStatusDeciders from "./TemplateDateStatusDeciders.vue";
	import OptionContainerProfessional from "./OptionContainerProfessional.vue";
	import AddOptionButton from "./AddOptionButton.vue";
	import { createShortTitle } from "../../src/plugins/utils";

	export default defineComponent({
		name: "MadrTemplateBasic",
		components: {
			TemplateHeader,
			OptionContainerProfessional,
			AddOptionButton,
			draggable: VueDraggableNext,
			TemplateDateStatusDeciders,
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
				date: "",
				status: "",
				deciders: "",
				technicalStory: "",
				contextAndProblemStatement: "",
				decisionDrivers: [] as string[],
				consideredOptions: [] as {
					title: string;
					description: string;
					pros: string[];
					cons: string[];
				}[],
				decisionOutcome: {
					chosenOption: "",
					explanation: "",
					positiveConsequences: [] as string[],
					negativeConsequences: [] as string[],
				},
				links: [] as string[],
				selectedIndex: -1,
				showModal: false,
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
			/**
			 * Computes the short title of the option that has been chosen by the user.
			 */
			chosenOptionText() {
				return this.decisionOutcome.chosenOption !== ""
					? createShortTitle(this.decisionOutcome.chosenOption)
					: "none";
			},
			/**
			 * Computes a new decision drivers array with a blank entry at the end of the array such that
			 * a blank input field is rendered for the user to enter a new decision driver in.
			 */
			decisionDriversWithBlank() {
				const decisionDriversWithBlank = this.decisionDrivers;
				decisionDriversWithBlank.push("");
				return decisionDriversWithBlank;
			},
			/**
			 * Computes a new positive consequences array with a blank entry at the end of the array such that
			 * a blank input field is rendered for the user to enter a new decision driver in.
			 */
			positiveConsequencesWithBlank() {
				const positiveConsequencesWithBlank = this.decisionOutcome.positiveConsequences;
				positiveConsequencesWithBlank.push("");
				return positiveConsequencesWithBlank;
			},
			/**
			 * Computes a new negative consequences array with a blank entry at the end of the array such that
			 * a blank input field is rendered for the user to enter a new decision driver in.
			 */
			negativeConsequencesWithBlank() {
				const negativeConsequencesWithBlank = this.decisionOutcome.negativeConsequences;
				negativeConsequencesWithBlank.push("");
				return negativeConsequencesWithBlank;
			},
			/**
			 * Computes a new links array with a blank entry at the end of the array such that
			 * a blank input field is rendered for the user to enter a new link in.
			 */
			linksWithBlank() {
				const linksWithBlank = this.links;
				linksWithBlank.push("");
				return linksWithBlank;
			},
		},
		methods: {
			/**
			 * Fills the fields with the existing values of the ADR.
			 */
			fillFields(adr: {
				title: string;
				date: string;
				status: string;
				deciders: string;
				technicalStory: string;
				contextAndProblemStatement: string;
				decisionDrivers: string[];
				consideredOptions: {
					title: string;
					description: string;
					pros: string[];
					cons: string[];
				}[];
				decisionOutcome: {
					chosenOption: string;
					explanation: string;
					positiveConsequences: string[];
					negativeConsequences: string[];
				};
				links: string[];
			}) {
				this.title = adr.title;
				this.oldTitle = adr.title;
				this.date = adr.date;
				this.status = adr.status;
				this.deciders = adr.deciders;
				this.technicalStory = adr.technicalStory;
				this.contextAndProblemStatement = adr.contextAndProblemStatement;
				this.decisionDrivers = adr.decisionDrivers;
				this.consideredOptions = adr.consideredOptions;
				this.decisionOutcome = adr.decisionOutcome;
				this.links = adr.links;
				this.selectOption(
					this.consideredOptions.findIndex((option) => {
						return createShortTitle(option.title) === createShortTitle(this.decisionOutcome.chosenOption);
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
					this.decisionOutcome.chosenOption = this.consideredOptions[this.selectedIndex].title;
				} else {
					this.decisionOutcome.chosenOption = "";
				}
				console.log("SelectedIndex: ", this.selectedIndex);
				console.log("Options: ", this.consideredOptions);
				console.log("Decision Outcome: ", this.decisionOutcome);
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
			 * Re-selects a previously selected option after dragging to prevent inconsistencies.
			 * @param evt The event object
			 */
			checkSelection(evt: any) {
				if (evt.oldIndex === this.selectedIndex) {
					this.selectOption(evt.newIndex);
				}
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
				this.sendMessage("addOption");
			},
			/**
			 * Updates the list of decision drivers/links.
			 */
			updateArray(array: string, text: string, index: number) {
				if (array === "decisionDrivers") {
					this.decisionDrivers.splice(index, 1, text);
					this.decisionDrivers = this.decisionDrivers.filter((driver) => driver);
				} else if (array === "links") {
					this.links.splice(index, 1, text);
					this.links = this.links.filter((link) => link);
				} else if (array === "positiveConsequences") {
					this.decisionOutcome.positiveConsequences.splice(index, 1, text);
					this.decisionOutcome.positiveConsequences = this.decisionOutcome.positiveConsequences.filter(
						(positive) => positive
					);
				} else if (array === "negativeConsequences") {
					this.decisionOutcome.negativeConsequences.splice(index, 1, text);
					this.decisionOutcome.negativeConsequences = this.decisionOutcome.negativeConsequences.filter(
						(negative) => negative
					);
				}
				this.validateAll();
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
							!this.v$.consideredOptions.$error
						) {
							this.valid.consideredOptions = true;
						} else {
							this.valid.consideredOptions = false;
						}

						break;
					case "chosenOption":
						if (
							//@ts-ignore
							!this.v$.decisionOutcome.chosenOption.$error &&
							this.selectedIndex !== -1 &&
							this.consideredOptions[this.selectedIndex].title === this.decisionOutcome.chosenOption &&
							this.decisionOutcome.chosenOption !== ""
						) {
							this.valid.chosenOption = true;
						} else {
							this.valid.chosenOption = false;
						}
						break;
					case "explanation":
						//@ts-ignore
						if (!this.v$.decisionOutcome.explanation.$error) {
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
						date: this.date,
						status: this.status,
						deciders: this.deciders,
						technicalStory: this.technicalStory,
						contextAndProblemStatement: this.contextAndProblemStatement,
						decisionDrivers: this.decisionDrivers,
						consideredOptions: this.consideredOptions,
						decisionOutcome: this.decisionOutcome,
						links: this.links,
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
					case "addOption":
						this.consideredOptions.push({ title: message.option, description: "", pros: [], cons: [] });
						if (this.consideredOptions.length === 1) {
							this.selectOption(0);
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
				decisionOutcome: {
					chosenOption: {
						required,
						$lazy: true,
					},
					explanation: {
						required,
						$lazy: true,
					},
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
		margin-top: 2rem;
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
		@include centered-flex(column);
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.dragArea {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
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

	#consequences {
		display: flex;
		margin: 1rem 0;
	}

	#positiveConsequences,
	#negativeConsequences {
		flex: 1;
	}

	#positives,
	#negatives {
		width: 95%;
	}

	.multiInput {
		@include centered-flex(row);
		justify-content: left;
		margin: 0.5rem 0;
	}

	#multiInputDeleteIcon {
		transform: scale(1.5);
		margin-left: 0.5rem;
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
