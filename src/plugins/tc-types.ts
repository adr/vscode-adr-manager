export const VALID_CATEGORIES = [
	'abstraction',
	'modularity',
	'api-stability',
	'automation',
	'compliance-readiness',
	'knowledge-preservation',
	'configurability',
	'observability',
	'reusability',
] as const;

export const VALID_SIGNALS = [
	'reduced-change-scope',
	'interface-stability',
	'faster-feature-delivery',
	'no-structural-refactor',
	'defect-reduction',
	'compliance-absorbed',
	'onboarding-speed',
	'reuse-observed',
] as const;

export const VALID_STATUSES = [
	'anticipated',
	'realised',
	'partial',
	'not-yet-assessable',
	'failed',
] as const;

export type TcCategory = typeof VALID_CATEGORIES[number];
export type TcSignal = typeof VALID_SIGNALS[number];
export type TcStatus = typeof VALID_STATUSES[number];

export type TcConfidence = 1 | 2 | 3 | 4 | 5;

export interface TcSignals {
	tags: TcSignal[];
	note?: string;
}

export interface TcAnnotation {
	benefit: string;
	category: TcCategory;
	conditions: string;
	signals: TcSignals;
	confidence: TcConfidence;
	status?: TcStatus;
	related?: string[];
}
