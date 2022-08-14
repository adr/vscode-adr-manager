<template>
	<div id="links" class="input-group">
		<TemplateHeader :infoText="'Add references, e.g., to related ADRs.'">
			<h2>Links</h2>
		</TemplateHeader>
		<draggable
			class="drag-area"
			:list="links"
			:sort="true"
			handle=".links-grabber"
			@update="
				updateHeight();
				checkMove;
			"
		>
			<div v-for="(link, index) in linksWithBlank" :key="index" class="multi-input" ref="links">
				<i class="codicon codicon-grabber links-grabber" v-if="links[index] !== ''"></i>
				<textarea
					class="auto-grow-link"
					spellcheck="true"
					v-model="links[index]"
					@input="updateArray($event.target.value, index)"
				/>
				<i
					class="codicon codicon-close multi-input-delete-icon"
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
				this.updateHeight();
			},
			/**
			 * Updated the height of the textarea based on the input.
			 */
			updateHeight() {
				this.$nextTick(() => {
					const links = document.querySelectorAll(".auto-grow-link") as NodeListOf<HTMLElement>;
					links.forEach((link) => {
						link.style.height = "auto";
						link.style.height = `${link.scrollHeight}px`;
					});
				});
			},
		},
		/**
		 * Triggers the height update for textareas when first loading the webview (in case existing data is being loaded)
		 */
		mounted() {
			//@ts-ignore
			this.$refs.links.forEach((link) => {
				if (link.children[1]) {
					link.children[1].dispatchEvent(new Event("input"));
				}
			});
		},
	});
</script>

<style lang="scss" scoped>
	@use "../static/mixins.scss" as *;

	.input-group {
		margin-bottom: 1.5rem;

		& input {
			height: 3rem;
		}
	}

	.multi-input {
		@include centered-flex(row);
		justify-content: left;
		margin: 0.5rem 0;
		& .auto-grow-link {
			height: 39px;
			resize: none;
			overflow-y: hidden;
		}
	}

	.multi-input-delete-icon {
		transform: scale(1.5);
		margin-left: 0.5rem;

		&:hover {
			cursor: pointer;
		}
	}

	.drag-area {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
	}

	.links-grabber {
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
