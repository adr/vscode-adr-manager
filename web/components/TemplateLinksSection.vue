<template>
	<div id="links" class="inputGroup">
		<TemplateHeader :infoText="'Add references, e.g., to related ADRs.'">
			<h2>Links</h2>
		</TemplateHeader>
		<draggable class="dragArea" :list="links" :sort="true" handle="#linksGrabber" @update="checkMove">
			<div v-for="(link, index) in linksWithBlank" :key="index" class="multiInput">
				<i id="linksGrabber" class="codicon codicon-grabber" v-if="links[index] !== ''"></i>
				<input v-model="links[index]" @input="updateArray($event.target.value, index)" />
				<i
					id="multiInputDeleteIcon"
					class="codicon codicon-close"
					v-if="links[index] !== ''"
					@click="updateArray('', index)"
				></i>
			</div>
		</draggable>
	</div>
</template>

<script lang="ts">
	import { defineComponent, PropType } from "vue";
	import { VueDraggableNext } from "vue-draggable-next";
	import TemplateHeader from "./TemplateHeader.vue";

	export default defineComponent({
		name: "TemplateLinksSection",
		components: {
			TemplateHeader,
			draggable: VueDraggableNext,
		},
		props: {
			linksProp: {
				type: Array as PropType<string[]>,
				default: [],
			},
		},
		data() {
			return {
				links: this.linksProp,
			};
		},
		computed: {
			/**
			 * Computes a new decision drivers array with a blank entry at the end of the array such that
			 * a blank input field is rendered for the user to enter a new decision driver in.
			 */
			linksWithBlank() {
				const linksWithBlank = this.links;
				linksWithBlank.push("");
				return linksWithBlank;
			},
		},
		methods: {
			/**
			 * Prevents the user to drag an item below an empty input field that is reserved for new inputs.
			 * @param evt The event fired upon causing an update with a drag
			 */
			checkMove(evt: any) {
				if (this.links[evt.newIndex - 1] === "") {
					this.links[evt.newIndex - 1] = this.links[evt.newIndex];
					this.links.splice(evt.newIndex, 1);
					this.links = this.links.filter((link) => link !== "");
				}
			},
			/**
			 * Updates the list of decision drivers/links.
			 */
			updateArray(text: string, index: number) {
				this.links.splice(index, 1, text);
				this.links = this.links.filter((link) => link !== "");
				this.$emit("update:links", this.links);
			},
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	.inputGroup {
		margin-bottom: 1.5rem;

		& input {
			height: 3rem;
		}
	}

	.multiInput {
		@include centered-flex(row);
		justify-content: left;
		margin: 0.5rem 0;
	}

	#multiInputDeleteIcon {
		transform: scale(1.5);
		margin-left: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}

	.dragArea {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
	}

	#linksGrabber {
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
</style>
