import * as vscode from "vscode";
import { createShortTitle, naturalCase2titleCase } from "./plugins/utils";

/**
 * Returns an array of MADR-related diagnostics for the specified text document
 * @param doc The TextDocument object for which the diagnostics will be created
 */
export async function getDiagnostics(doc: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
	const diagnostics = new Array<vscode.Diagnostic>();
	let requiredFields = {
		title: false,
		contextAndProblemStatement: false,
		consideredOptions: false,
		decisionOutcome: false,
	};
	let yamlMarkers = 0;

	const rawText = doc.getText();
	const textLines = rawText.split(/\r\n|\n/);

	const consideredOptions = await extractListItems(doc.uri, "Considered Options");

	for (let i = 0; i < textLines.length; i++) {
		// check required fields
		if (!requiredFields.title && /^#\s.*/.test(textLines[i])) {
			requiredFields.title = true;
		}
		if (!requiredFields.contextAndProblemStatement && /^## Context and Problem Statement/i.test(textLines[i])) {
			requiredFields.contextAndProblemStatement = true;
		}
		if (!requiredFields.consideredOptions && /^## Considered Options/i.test(textLines[i])) {
			requiredFields.consideredOptions = true;
		}
		if (!requiredFields.decisionOutcome && /^## Decision Outcome/i.test(textLines[i])) {
			requiredFields.decisionOutcome = true;
		}

		// check for YAML
		if (/^---$/.test(textLines[i])) {
			if (yamlMarkers === 0 && i > 0) {
				diagnostics.push({
					severity: vscode.DiagnosticSeverity.Error,
					message: "YAML Front Matter is not at the beginning of the ADR.",
					code: "madr-yaml-not-at-the-beginning",
					range: new vscode.Range(i, 0, i, textLines[i].length),
				});
			}
			yamlMarkers++;
		}

		// check header lines
		if (textLines[i].startsWith("#", 0)) {
			diagnostics.push(...getHeaderDiagnostics(textLines[i], i));
		}

		// check if chosen option exists in considered options
		if (/^Chosen option:/i.test(textLines[i])) {
			if (
				consideredOptions.findIndex((option) => {
					return createShortTitle(option) === createShortTitle(getChosenOptionFromLine(textLines[i]));
				}) === -1
			) {
				diagnostics.push(getInvalidChosenOptionDiagnostic(textLines[i], i));
			}
		}
	}

	diagnostics.push(...getRequiredFieldsDiagnostics(requiredFields));

	return diagnostics;
}

/**
 * Returns an array of diagnostics related to a heading of a MADR.
 * @param line The heading line to check for diagnostics
 */
function getHeaderDiagnostics(line: string, lineNumber: number): vscode.Diagnostic[] {
	const headingDiagnostics = new Array<vscode.Diagnostic>();

	// Check header and subheader lines for title casing
	if (/^#{1,2}\s.*/.test(line) && !headerIsInTitleCase(line)) {
		headingDiagnostics.push({
			severity: vscode.DiagnosticSeverity.Warning,
			message: "Header is not written in title case.",
			code: "madr-header-not-in-title-case",
			source: "ADR Manager",
			range: new vscode.Range(lineNumber, 0, lineNumber, line.length),
		});
	}

	return headingDiagnostics;
}

/**
 * Returns an array of diagnostics related to required fields of a MADR.
 * @param fields An object with flag properties for each required field of a MADR
 * @returns An array of diagnostics related to required fields of a MADR
 */
function getRequiredFieldsDiagnostics(fields: {
	title: boolean;
	contextAndProblemStatement: boolean;
	consideredOptions: boolean;
	decisionOutcome: boolean;
}): vscode.Diagnostic[] {
	const requiredFieldsDiagnostics = new Array<vscode.Diagnostic>();

	if (!fields.title) {
		requiredFieldsDiagnostics.push({
			severity: vscode.DiagnosticSeverity.Error,
			message: "ADR does not have a title header.",
			code: "madr-no-title-header",
			source: "ADR Manager",
			range: new vscode.Range(0, 0, 0, 1),
		});
	}
	if (!fields.contextAndProblemStatement) {
		requiredFieldsDiagnostics.push({
			severity: vscode.DiagnosticSeverity.Warning,
			message: "ADR does not have a '## Context and Problem Statement' subheader.",
			code: "madr-no-context-and-problem-statement-subheader",
			source: "ADR Manager",
			range: new vscode.Range(0, 0, 0, 1),
		});
	}
	if (!fields.consideredOptions) {
		requiredFieldsDiagnostics.push({
			severity: vscode.DiagnosticSeverity.Warning,
			message: "ADR does not have a '## Considered Options' subheader.",
			code: "madr-no-considered-options-subheader",
			source: "ADR Manager",
			range: new vscode.Range(0, 0, 0, 1),
		});
	}
	if (!fields.decisionOutcome) {
		requiredFieldsDiagnostics.push({
			severity: vscode.DiagnosticSeverity.Warning,
			message: "ADR does not have a '## Decision Outcome' subheader.",
			code: "madr-no-decision-outcome-subheader",
			source: "ADR Manager",
			range: new vscode.Range(0, 0, 0, 1),
		});
	}

	return requiredFieldsDiagnostics;
}

/**
 * Returns a diagnostic stating that the chosen option is not listed in the list of considered options
 * @param line The line containing the chosen option
 */
function getInvalidChosenOptionDiagnostic(line: string, lineNumber: number): vscode.Diagnostic {
	const indexOfFirstQuote = line.indexOf('"', 0);
	const indexOfSecondQuote = line.indexOf('"', indexOfFirstQuote + 1);
	return {
		severity: vscode.DiagnosticSeverity.Error,
		message: "Chosen option is not in the list of considered options.",
		code: "madr-chosen-option-not-in-considered-options",
		source: "ADR Manager",
		range: new vscode.Range(lineNumber, 0, lineNumber, indexOfSecondQuote + 1),
	};
}

/**
 * Returns true iff the specified line is written in title case.
 * @param line The line to check
 */
function headerIsInTitleCase(line: string): boolean {
	return line === naturalCase2titleCase(line);
}

/**
 * Returns every list item under a specified heading in a given file (specified by the file URI).
 * @param fileUri The URI of the file to extract list items from
 * @param heading The name of the heading under which the list items will be extracted, excluding the preceding
 * 				  "#" symbols and whitespace used in Markdown for heading syntax
 * @returns A Promise object which resolves to a string array of list items under the specified heading
 */
async function extractListItems(fileUri: vscode.Uri, heading: string): Promise<string[]> {
	// Get text from file
	const file = await vscode.workspace.openTextDocument(fileUri);
	const text = file.getText();

	// This regex matches zero-width characters which have a heading before it and one or more list items after it.
	// The regex does not match "#" symbols in headings or list symbols, like "*", "-", "+".
	// The result of matchAll is a two-dimensional array with entries in the form of [zero-width character, heading, list item].
	const regex = /(?<=#{1,6} (.*)\n(?:(?!#).*\n)*)(?=[+*-] (.*(?:\n(?![#+*-]).+)?))/g;
	const matches = [...text.matchAll(regex)];

	// Clean matches
	const result = matches.reduce((acc, curr) => {
		// remove zero-width character
		const [title, item] = curr.slice(1);
		// check for correct heading
		if (title.toLowerCase() === heading.toLowerCase()) {
			acc.push(item);
		}
		return acc;
	}, []);

	return result;
}

/**
 * Returns the chosen option in the 'Chosen option' line.
 * @param line The line from which the chosen option should be extracted
 */
function getChosenOptionFromLine(line: string): string {
	if (!/^Chosen option: /i.test(line)) {
		return "";
	}
	const indexOfFirstQuote = line.indexOf('"', 0);
	const indexOfSecondQuote = line.indexOf('"', indexOfFirstQuote + 1);
	return line.substring(indexOfFirstQuote + 1, indexOfSecondQuote);
}
