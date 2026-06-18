<template>
	<div class="input-group">
		<TemplateHeader :infoText="'Captures the long-term technical benefit this decision is expected to create and how to tell whether it materialises'">
			<h2>Technical Credit Annotation</h2>
		</TemplateHeader>

		<div class="tc-field">
			<h3>Anticipated Benefit</h3>
			<textarea v-model="tcBenefit" spellcheck="true"
				placeholder="What long-term advantage does this decision create?" />
			<select v-model="tcCategory" class="category-select">
				<option value="" disabled>Category Tag</option>
				<option value="abstraction">Abstraction</option>
				<option value="modularity">Modularity</option>
				<option value="api-stability">API stability</option>
				<option value="automation">Automation</option>
				<option value="compliance-readiness">Compliance readiness</option>
				<option value="knowledge-preservation">Knowledge preservation</option>
				<option value="configurability">Configurability</option>
				<option value="observability">Observability</option>
				<option value="reusability">Reusability</option>
			</select>
		</div>

		<div class="tc-field">
			<h3>Realisation Conditions</h3>
			<textarea v-model="tcConditions" spellcheck="true"
				placeholder="Under what circumstances will this benefit materialise?" />
		</div>

		<div class="tc-field">
			<h3>Observable Signals</h3>
			<div v-for="signal in signalOptions" :key="signal.value" class="signal-option">
				<input type="checkbox" :value="signal.value" v-model="tcSignals" :id="signal.value" />
				<label :for="signal.value">{{ signal.label }}</label>
			</div>
		</div>

		<div class="tc-field">
			<h3>Confidence Level: {{ tcConfidence }}</h3>
			<input type="range" min="1" max="5" v-model="tcConfidence" />
			<div class="confidence-labels">
				<span>1 speculative</span>
				<span>2 low</span>
				<span>3 moderate</span>
				<span>4 high</span>
				<span>5 evidenced</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TemplateHeader from "./TemplateHeader.vue";

export default defineComponent({
	name: "TemplateTCAnnotationSection",
	components: {
		TemplateHeader,
	},
	props: {
		// The shared, reactive TC annotation object owned by the adr-data mixin.
		// We read from and write into it directly so changes propagate to the parent.
		tc: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			signalOptions: [
				{ value: "reduced-change-scope", label: "Reduced change scope" },
				{ value: "interface-stability", label: "Interface stability" },
				{ value: "faster-feature-delivery", label: "Faster feature delivery" },
				{ value: "no-structural-refactor", label: "No structural refactor" },
				{ value: "defect-reduction", label: "Defect reduction" },
				{ value: "compliance-absorbed", label: "Compliance absorbed" },
				{ value: "onboarding-speed", label: "Onboarding speed" },
				{ value: "reuse-observed", label: "Reuse observed" },
			],
		};
	},
	computed: {
		// Each binding reads/writes the matching field on the shared tc object so that
		// the parent's reactive state (and the YAML it serializes to) stays in sync.
		// The basic editor omits the pro-only status and related-decisions fields.
		tcBenefit: {
			get(): string {
				return this.tc.benefit ?? "";
			},
			set(value: string) {
				this.tc.benefit = value;
			},
		},
		tcCategory: {
			get(): string {
				return this.tc.category ?? "";
			},
			set(value: string) {
				this.tc.category = value;
			},
		},
		tcConditions: {
			get(): string {
				return this.tc.conditions ?? "";
			},
			set(value: string) {
				this.tc.conditions = value;
			},
		},
		tcConfidence: {
			get(): number {
				return this.tc.confidence ?? 3;
			},
			set(value: string | number) {
				this.tc.confidence = Number(value);
			},
		},
		tcSignals: {
			get(): string[] {
				return this.tc.signals?.tags ?? [];
			},
			set(value: string[]) {
				this.tc.signals.tags = value;
			},
		},
	},
});
</script>

<style lang="scss" scoped>
@use "../static/mixins.scss" as *;

.input-group {
	margin-bottom: 1.5rem;
}

.tc-field {
	margin-bottom: 1.5rem;

	& textarea {
		width: 100%;
		min-height: 80px;
		resize: vertical;
	}

	& input[type="range"] {
		width: 100%;
		margin: 0.5rem 0;
	}
}

.confidence-labels {
	display: flex;
	justify-content: space-between;
	font-size: 0.75rem;
	color: var(--vscode-descriptionForeground);
}

.signal-option {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 0.4rem;

	& label {
		cursor: pointer;
	}
}

.category-label {
	display: block;
	margin-top: 0.75rem;
	margin-bottom: 0.25rem;
	font-size: 0.85rem;
	color: var(--vscode-descriptionForeground);
}

.category-select {
	width: 100%;
	background: var(--vscode-input-background);
	color: var(--vscode-input-foreground);
	border: 1px solid var(--vscode-input-border);
	padding: 0.4rem 0.5rem;
	border-radius: 2px;
	font-size: 0.9rem;

	&:focus {
		outline: 1px solid var(--vscode-focusBorder);
		border-color: var(--vscode-focusBorder);
	}
}
.field-prompt {
    font-style: italic;
    color: var(--vscode-descriptionForeground);
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
}
</style>