export type TcCategory =
	| 'abstraction'
	| 'modularity'
	| 'api-stability'
	| 'automation'
	| 'compliance-readiness'
	| 'knowledge-preservation'
	| 'configurability'
	| 'observability'
	| 'reusability';

export type TcSignal =
	| 'reduced-change-scope'
	| 'interface-stability'
	| 'faster-feature-delivery'
	| 'no-structural-refactor'
	| 'defect-reduction'
	| 'compliance-absorbed'
	| 'onboarding-speed'
	| 'reuse-observed';

export type TcStatus = 'anticipated' | 'realised' | 'partial' | 'not-yet-assessable' | 'failed';

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
