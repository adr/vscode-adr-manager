<template>
	<div id="decision-outcome-container">
		<TemplateHeader :infoText="'Add an explanation for the chosen option.'">
			<h2>Decision Outcome</h2>
		</TemplateHeader>
		<h3 id="chosen-option-text">
			Chosen Option: <b>{{ chosenOptionText }}</b>
		</h3>
		<div id="explanation">
			<h3>because</h3>
			<div id="explanation-input-container">
				<input
					type="text"
					spellcheck="true"
					:class="
						v$.decisionOutcome.explanation.$error
							? 'invalid-input'
							: v$.decisionOutcome.explanation.$dirty
							? 'valid-input'
							: ''
					"
					v-model="v$.decisionOutcome.explanation.$model"
					@input="
						$emit('update:explanation', $event.target.value);
						$emit('validate');
					"
				/>
				<h4 class="error-message" v-for="error of v$.decisionOutcome.explanation.$errors" :key="error.$uid">
					{{ error.$message }}
				</h4>
			</div>
		</div>
		<div id="consequences-container">
			<div id="positive-consequences-container">
				<TemplateHeader
					:infoText="'Give positive consequences, e.g., improvement of a quality attribute, follow-up decisions required, ...'"
				>
					<h3>Positive Consequences</h3>
				</TemplateHeader>
				<draggable
					class="drag-area"
					:list="decisionOutcome.positiveConsequences"
					:sort="true"
					handle=".positive-consequences-grabber"
					@update="checkMove('positiveConsequences', $event)"
				>
					<div
						v-for="(positive, index) in positiveConsequencesWithBlank"
						:key="index"
						class="multi-input"
						id="positives"
					>
						<i
							class="codicon codicon-grabber positive-consequences-grabber"
							v-if="decisionOutcome.positiveConsequences[index] !== ''"
						></i>
						<input
							spellcheck="true"
							v-model="decisionOutcome.positiveConsequences[index]"
							@input="updateArray('positiveConsequences', $event.target.value, index)"
						/>
						<i
							class="codicon codicon-close multi-input-delete-icon"
							v-if="decisionOutcome.positiveConsequences[index] !== ''"
							@click="updateArray('positiveConsequences', '', index)"
						></i>
					</div>
				</draggable>
			</div>
			<div id="negative-consequences-container">
				<TemplateHeader
					:infoText="'Give negative consequences, e.g., afflicted quality attributes, follow-up decisions required, ...'"
				>
					<h3>Negative Consequences:</h3>
				</TemplateHeader>
				<draggable
					class="drag-area"
					:list="decisionOutcome.negativeConsequences"
					:sort="true"
					handle=".negative-consequences-grabber"
					@update="checkMove('negativeConsequences', $event)"
				>
					<div
						v-for="(negative, index) in negativeConsequencesWithBlank"
						:key="index"
						class="multi-input"
						id="negatives"
					>
						<i
							class="codicon codicon-grabber negative-consequences-grabber"
							v-if="decisionOutcome.negativeConsequences[index] !== ''"
						></i>
						<input
							spellcheck="true"
							v-model="decisionOutcome.negativeConsequences[index]"
							@input="updateArray('negativeConsequences', $event.target.value, index)"
						/>
						<i
							class="codicon codicon-close multi-input-delete-icon"
							v-if="decisionOutcome.negativeConsequences[index] !== ''"
							@click="updateArray('negativeConsequences', '', index)"
						></i>
					</div>
				</draggable>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";
	import useVuelidate from "@vuelidate/core";
	import { required } from "@vuelidate/validators";
	import { VueDraggableNext } from "vue-draggable-next";
	import TemplateHeader from "./TemplateHeader.vue";
	import { createShortTitle } from "../../src/plugins/utils";

	export default defineComponent({
		name: "TemplateDecisionOutcomeProfessionalSection",
		components: {
			TemplateHeader,
			draggable: VueDraggableNext,
		},
		setup() {
			return {
				v$: useVuelidate(),
			};
		},
		props: {
			decisionOutcomeProp: {
				type: Object as PropType<{
					chosenOption: string;
					explanation: string;
					positiveConsequences: string[];
					negativeConsequences: string[];
				}>,
				default: {
					chosenOption: "",
					explanation: "",
					positiveConsequences: [] as string[],
					negativeConsequences: [] as string[],
				},
			},
		},
		data() {
			return {
				decisionOutcome: this.decisionOutcomeProp,
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
		},
		methods: {
			/**
			 * Prevents the user to drag an item below an empty input field that is reserved for new inputs.
			 * @param evt The event fired upon causing an update with a drag
			 */
			checkMove(array: string, evt: any) {
				if (array === "positiveConsequences") {
					if (this.decisionOutcome.positiveConsequences[evt.newIndex - 1] === "") {
						this.decisionOutcome.positiveConsequences[evt.newIndex - 1] =
							this.decisionOutcome.positiveConsequences[evt.newIndex];
						this.decisionOutcome.positiveConsequences.splice(evt.newIndex, 1);
						this.decisionOutcome.positiveConsequences = this.decisionOutcome.positiveConsequences.filter(
							(positive) => positive !== ""
						);
					}
				} else if (array === "negativeConsequences") {
					if (this.decisionOutcome.negativeConsequences[evt.newIndex - 1] === "") {
						this.decisionOutcome.negativeConsequences[evt.newIndex - 1] =
							this.decisionOutcome.negativeConsequences[evt.newIndex];
						this.decisionOutcome.negativeConsequences.splice(evt.newIndex, 1);
						this.decisionOutcome.negativeConsequences = this.decisionOutcome.negativeConsequences.filter(
							(negative) => negative !== ""
						);
					}
				}
			},
			/**
			 * Updates the list of decision drivers/links.
			 */
			updateArray(name: string, text: string, index: number) {
				if (name === "positiveConsequences") {
					this.decisionOutcome.positiveConsequences.splice(index, 1, text);
					this.decisionOutcome.positiveConsequences = this.decisionOutcome.positiveConsequences.filter(
						(positive) => positive !== ""
					);
					this.$emit("update:positiveConsequences", this.decisionOutcome.positiveConsequences);
				} else if (name === "negativeConsequences") {
					this.decisionOutcome.negativeConsequences.splice(index, 1, text);
					this.decisionOutcome.negativeConsequences = this.decisionOutcome.negativeConsequences.filter(
						(negative) => negative !== ""
					);
					this.$emit("update:negativeConsequences", this.decisionOutcome.negativeConsequences);
				}
				this.$emit("updateArray");
			},
		},
		validations() {
			return {
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

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	#chosen-option-text {
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

	#explanation-input-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	#consequences-container {
		display: flex;
		margin: 1rem 0;
	}

	#positive-consequences-container,
	#negative-consequences-container {
		flex: 1;
	}

	#positives,
	#negatives {
		width: 95%;
	}

	.drag-area {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
	}

	.positive-consequences-grabber,
	.negative-consequences-grabber {
		position: initial;
		margin-right: 0.5rem;
		transform: scale(1.2);

		&:hover {
			cursor: grab;
		}

		&:active {
			cursor: grabbing;
		}
	}

	.multi-input {
		@include centered-flex(row);
		justify-content: left;
		margin: 0.5rem 0;
	}

	.multi-input-delete-icon {
		transform: scale(1.5);
		margin-left: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}

	.valid-input,
	.valid-input:focus {
		border: 1.5px solid green !important;
		outline-color: green !important;
	}

	.invalid-input,
	.invalid-input:focus {
		border: 1.5px solid var(--vscode-editorError-foreground) !important;
		outline-color: var(--vscode-editorError-foreground) !important;
	}

	.error-message {
		color: var(--vscode-editorError-foreground);
	}
</style>
