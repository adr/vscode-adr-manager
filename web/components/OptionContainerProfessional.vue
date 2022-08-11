<template>
	<div
		id="professional-option-container"
		:class="isExpanded ? 'expanded' : 'collapsed'"
		@click.self="$emit('selectOption')"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<h4 @click="$emit('selectOption')"><strong>Title</strong></h4>
		<input spellcheck="true" :value="title" @input="$emit('update:title', $event.target.value)" />
		<div id="option-description-container">
			<h4><strong>Description</strong></h4>
			<input spellcheck="true" :value="description" @input="$emit('update:description', $event.target.value)" />
		</div>
		<div id="pros-and-cons" @click.self="$emit('selectOption')">
			<div id="pros-container" @click.self="$emit('selectOption')">
				<h4 @click="$emit('selectOption')"><strong>Good, because...</strong></h4>
				<draggable
					class="drag-area"
					:list="pros"
					:sort="true"
					handle=".pros-grabber"
					@update="checkMove('pros', $event)"
				>
					<div v-for="(pro, index) in prosWithBlank" :key="index" id="pros">
						<i class="codicon codicon-grabber pros-grabber" v-if="pros[index] !== ''"></i>
						<input
							spellcheck="true"
							v-model="pros[index]"
							@input="updateArray('pros', $event.target.value, index)"
						/>
						<i
							class="codicon codicon-close multi-input-delete-icon"
							v-if="pros[index] !== ''"
							@click="updateArray('pros', '', index)"
						></i>
					</div>
				</draggable>
			</div>
			<div id="cons-container" @click.self="$emit('selectOption')">
				<h4 @click="$emit('selectOption')"><strong>Bad, because...</strong></h4>
				<draggable
					class="drag-area"
					:list="cons"
					:sort="true"
					handle=".cons-grabber"
					@update="checkMove('cons', $event)"
				>
					<div v-for="(con, index) in consWithBlank" :key="index" id="cons">
						<i class="codicon codicon-grabber cons-grabber" v-if="cons[index] !== ''"></i>
						<input
							spellcheck="true"
							v-model="cons[index]"
							@input="updateArray('cons', $event.target.value, index)"
						/>
						<i
							class="codicon codicon-close multi-input-delete-icon"
							v-if="cons[index] !== ''"
							@click="updateArray('cons', '', index)"
						></i>
					</div>
				</draggable>
			</div>
		</div>
		<i
			class="codicon expand-arrow"
			:class="isExpanded ? 'codicon-chevron-up' : 'codicon-chevron-down'"
			@click="isExpanded = !isExpanded"
		></i>
		<i class="codicon codicon-grabber option-grabber"></i>
		<i class="codicon codicon-trash delete-option-icon" @click="$emit('deleteOption')"></i>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";
	import { VueDraggableNext } from "vue-draggable-next";

	export default defineComponent({
		name: "OptionContainerProfessional",
		components: {
			draggable: VueDraggableNext,
		},
		props: {
			title: String,
			description: String,
			prosProp: {
				type: Array as PropType<string[]>,
				default: [],
			},
			consProp: {
				type: Array as PropType<string[]>,
				default: [],
			},
		},
		data() {
			return {
				isExpanded: false,
				isHovered: false,
				pros: this.prosProp,
				cons: this.consProp,
			};
		},
		computed: {
			prosWithBlank() {
				const prosWithBlank = this.pros;
				prosWithBlank.push("");
				return prosWithBlank;
			},
			consWithBlank() {
				const consWithBlank = this.cons;
				consWithBlank.push("");
				return consWithBlank;
			},
		},
		methods: {
			/**
			 * Prevents the user to drag an item below an empty input field that is reserved for new inputs.
			 * @param evt The event fired upon causing an update with a drag
			 */
			checkMove(array: string, evt: any) {
				if (array === "pros") {
					if (this.pros[evt.newIndex - 1] === "") {
						this.pros[evt.newIndex - 1] = this.pros[evt.newIndex];
						this.pros.splice(evt.newIndex, 1);
						this.pros = this.pros.filter((pro) => pro !== "");
					}
				} else if (array === "cons") {
					if (this.cons[evt.newIndex - 1] === "") {
						this.cons[evt.newIndex - 1] = this.cons[evt.newIndex];
						this.cons.splice(evt.newIndex, 1);
						this.cons = this.cons.filter((con) => con !== "");
					}
				}
			},
			/**
			 * Updates the list of decision drivers/links.
			 */
			updateArray(array: string, text: string, index: number) {
				if (array === "pros") {
					this.pros.splice(index, 1, text);
					this.pros = this.pros.filter((pro) => pro !== "");
					this.$emit("update:pros", this.pros);
				} else if (array === "cons") {
					this.cons.splice(index, 1, text);
					this.cons = this.cons.filter((con) => con !== "");
					this.$emit("update:cons", this.cons);
				}
			},
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	body.vscode-high-contrast #professional-option-container {
		border: 1px solid var(--vscode-contrastBorder);
	}

	body.vscode-high-contrast .selected-option .codicon,
	body.vscode-high-contrast .selected-option h4 {
		color: var(--vscode-editor-background);
	}

	#professional-option-container {
		position: relative;
		margin: 1rem;
		padding: 1rem;
		max-width: 100%;
		width: 100%;
		border: 1px solid var(--vscode-input-foreground);

		& h4 {
			margin: 1.2rem 0 0.5rem 0;
		}

		&:hover {
			cursor: pointer;
			filter: brightness(110%);
			transform: scale(1.01);
		}
	}

	#professional-option-container.collapsed {
		height: 6.9rem;
		flex-wrap: nowrap;
		overflow: hidden;
	}

	#professional-option-container.expanded {
		height: auto;
	}

	#pros-and-cons {
		display: flex;
		margin: 1rem 0;
		width: 100%;
	}

	#pros-container,
	#cons-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		flex: 1;
		align-items: stretch;

		& h4 {
			margin-left: 1rem;
		}

		& input {
			padding: auto 0.5rem;
			width: 100%;
		}
	}

	#pros,
	#cons {
		margin: 0.5rem 1rem 0.5rem 1rem;
		width: auto;
		display: flex;
		align-items: center;
	}

	.drag-area {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
	}

	.expand-arrow {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		transform: scale(1.2);

		&:hover {
			cursor: pointer;
		}
	}

	.option-grabber {
		position: absolute;
		top: 0.8rem;
		right: 50%;
		transform: scale(1.2);

		&:hover {
			cursor: grab;
		}

		&:active {
			cursor: grabbing;
		}
	}

	.pros-grabber,
	.cons-grabber {
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

	.multi-input-delete-icon {
		transform: scale(1.5);
		margin-left: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}

	.delete-option-icon {
		position: absolute;
		top: 0.8rem;
		right: 5rem;
		transform: scale(1.2);
		&:hover {
			cursor: pointer;
		}
	}

	.visible {
		display: unset;
	}

	.invisible {
		display: none !important;
	}
</style>
