<template>
	<div
		id="optionProfessional"
		:class="isExpanded ? 'expanded' : 'collapsed'"
		@click.self="$emit('selectOption')"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<h4 @click="$emit('selectOption')"><strong>Title</strong></h4>
		<input :value="title" @input="$emit('update:title', $event.target.value)" />
		<div id="optionDescription">
			<h4><strong>Description</strong></h4>
			<input :value="description" @input="$emit('update:description', $event.target.value)" />
		</div>
		<div id="prosAndCons" @click.self="$emit('selectOption')">
			<div id="prosContainer" @click.self="$emit('selectOption')">
				<h4 @click="$emit('selectOption')"><strong>Good, because...</strong></h4>
				<div v-for="(pro, index) in prosWithBlank" :key="index" id="pros">
					<input v-model="pros[index]" @input="updateArray('pros', $event.target.value, index)" />
					<i
						class="codicon codicon-close"
						v-if="pros[index] !== ''"
						@click="updateArray('pros', '', index)"
					></i>
				</div>
			</div>
			<div id="consContainer" @click.self="$emit('selectOption')">
				<h4 @click="$emit('selectOption')"><strong>Bad, because...</strong></h4>
				<div v-for="(con, index) in consWithBlank" :key="index" id="cons">
					<input v-model="cons[index]" @input="updateArray('cons', $event.target.value, index)" />
					<i
						class="codicon codicon-close"
						v-if="cons[index] !== ''"
						@click="updateArray('cons', '', index)"
					></i>
				</div>
			</div>
		</div>
		<i
			id="expandArrow"
			class="codicon"
			:class="isExpanded ? 'codicon-chevron-up' : 'codicon-chevron-down'"
			@click="isExpanded = !isExpanded"
		></i>
		<i id="grabber" class="codicon codicon-grabber" :class="isHovered ? 'visible' : 'invisible'"></i>
		<i
			id="deleteOptionIcon"
			class="codicon codicon-trash"
			:class="isHovered ? 'visible' : 'invisible'"
			@click="$emit('deleteOption')"
		></i>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";

	export default defineComponent({
		name: "OptionContainerProfessional",
		props: {
			title: String,
			description: String,
			pros: Array as PropType<string[]>,
			cons: Array as PropType<string[]>,
		},
		data() {
			return {
				isExpanded: false,
				isHovered: false,
			};
		},
		computed: {
			prosWithBlank() {
				const prosWithBlank = this.pros!;
				prosWithBlank.push("");
				return prosWithBlank;
			},
			consWithBlank() {
				const consWithBlank = this.cons!;
				consWithBlank.push("");
				return consWithBlank;
			},
		},
		methods: {
			/**
			 * Updates the list of decision drivers/links.
			 */
			updateArray(array: string, text: string, index: number) {
				if (array === "pros") {
					let newPros = this.pros!;
					newPros.splice(index, 1, text);
					newPros = this.pros!.filter((pro) => pro.length);
					this.$emit("update:pros", newPros);
				} else if (array === "cons") {
					let newCons = this.cons!;
					newCons.splice(index, 1, text);
					newCons = this.cons!.filter((con) => con.length);
					this.$emit("update:cons", newCons);
				}
			},
		},
	});
</script>

<style lang="scss">
	@use "../static/mixins.scss" as *;

	body.vscode-high-contrast {
		& #optionProfessional {
			border: 1px solid var(--vscode-contrastBorder);
		}
		& .selectedOption .codicon {
			color: var(--vscode-editor-background);
		}
	}

	#optionProfessional {
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
		}
	}

	#optionProfessional.collapsed {
		height: 6.9rem;
		flex-wrap: nowrap;
		overflow: hidden;
	}

	#optionProfessional.expanded {
		height: auto;
	}

	#prosAndCons {
		display: flex;
		margin: 1rem 0;
		width: 100%;
	}

	#prosContainer,
	#consContainer {
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

	#expandArrow {
		position: absolute;
		top: 0.8rem;
		right: 0.8rem;
		transform: scale(1.2);

		&:hover {
			cursor: pointer;
		}
	}

	#grabber {
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

	#deleteOptionIcon {
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
