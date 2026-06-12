import { TcAnnotation, VALID_CATEGORIES, VALID_SIGNALS, VALID_STATUSES } from "./tc-types";

export interface TcValidationError {
	field: string;
	message: string;
}

/**
 * Validates a TcAnnotation object against the TC schema.
 * Returns an array of validation errors — empty means valid.
 */
export function validateTcAnnotation(tc: TcAnnotation): TcValidationError[] {
	const errors: TcValidationError[] = [];

	if (!tc.benefit || tc.benefit.trim() === "") {
		errors.push({ field: "benefit", message: "benefit is required" });
	}

	if (!tc.category) {
		errors.push({ field: "category", message: "category is required" });
	} else if (!(VALID_CATEGORIES as readonly string[]).includes(tc.category)) {
		errors.push({ field: "category", message: `unknown category: '${tc.category}'` });
	}

	if (!tc.conditions || tc.conditions.trim() === "") {
		errors.push({ field: "conditions", message: "conditions is required" });
	}

	if (tc.confidence === null || tc.confidence === undefined) {
		errors.push({ field: "confidence", message: "confidence is required" });
	} else if (!Number.isInteger(tc.confidence) || tc.confidence < 1 || tc.confidence > 5) {
		errors.push({ field: "confidence", message: `confidence must be an integer between 1 and 5, got: ${tc.confidence}` });
	}

	if (tc.signals?.tags) {
		tc.signals.tags.forEach((tag) => {
			if (!(VALID_SIGNALS as readonly string[]).includes(tag)) {
				errors.push({ field: "signals", message: `unknown signal tag: '${tag}'` });
			}
		});
	}

	if (tc.status !== undefined && !(VALID_STATUSES as readonly string[]).includes(tc.status)) {
		errors.push({ field: "status", message: `unknown status: '${tc.status}'` });
	}

	if (tc.related !== undefined) {
		tc.related.forEach((ref, i) => {
			if (!ref || ref.trim() === "") {
				errors.push({ field: "related", message: `related entry at index ${i} is empty` });
			}
		});
	}

	return errors;
}
