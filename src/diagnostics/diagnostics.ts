import * as vscode from "vscode";
import { allDiagnostics } from "./diagnostics-collection";
import { createShortTitle, naturalCase2titleCase } from "../plugins/utils";

/**
 * Returns an array of MADR-related diagnostics for the specified text document
 * @param doc The TextDocument object for which the diagnostics will be created
 */
export async function getDiagnostics(doc: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
	const diagnostics = new Array<vscode.Diagnostic>();
	// indices of required fields for detecting empty fields of a MADR
	let indicesOfRequiredFields = {
		title: -1,
		contextAndProblemStatement: -1,
		consideredOptions: -1,
		decisionOutcome: -1,
	};

	const rawText = doc.getText();
	const textLines = rawText.split(/\r\n|\n/);

	const consideredOptions = await extractListItems(doc.uri, "Considered Options");

	for (let i = 0; i < textLines.length; i++) {
		// check required fields
		if (indicesOfRequiredFields.title === -1 && /^#\s.*/.test(textLines[i])) {
			indicesOfRequiredFields.title = i;
		}
		if (
			indicesOfRequiredFields.contextAndProblemStatement === -1 &&
			/^## Context and Problem Statement/i.test(textLines[i])
		) {
			indicesOfRequiredFields.contextAndProblemStatement = i;
		}
		if (indicesOfRequiredFields.consideredOptions === -1 && /^## Considered Options/i.test(textLines[i])) {
			indicesOfRequiredFields.consideredOptions = i;
		}
		if (indicesOfRequiredFields.decisionOutcome === -1 && /^## Decision Outcome/i.test(textLines[i])) {
			indicesOfRequiredFields.decisionOutcome = i;
		}

		// check header lines
		if (textLines[i].startsWith("#", 0)) {
			diagnostics.push(...getHeaderDiagnostics(textLines[i], i));
		}

		// check if chosen option exists in considered options
		if (/^Chosen option:/i.test(textLines[i])) {
			if (
				consideredOptions.findIndex((option) => {
					return (
						createShortTitle(option.trim()) ===
						createShortTitle(getChosenOptionFromLine(textLines[i]).trim())
					);
				}) === -1
			) {
				diagnostics.push(getInvalidChosenOptionDiagnostic(textLines[i], i));
			}
		}
	}

	// add diagnostics regarding required fields
	diagnostics.push(...getRequiredFieldsDiagnostics(indicesOfRequiredFields, textLines));

	return diagnostics;
}

/**
 * Returns an array of diagnostics related to a heading of a MADR.
 * @param line The heading line to check for diagnostics
 */
function getHeaderDiagnostics(line: string, lineNumber: number): vscode.Diagnostic[] {
	const headerDiagnostics = new Array<vscode.Diagnostic>();

	// Check header and subheader lines for title casing
	if (/^#{1,2}\s.*/.test(line) && !headerIsInTitleCase(line)) {
		headerDiagnostics.push(allDiagnostics.headerNotInTitleCase(lineNumber, 0, lineNumber, line.length));
	}

	return headerDiagnostics;
}

/**
 * Returns an array of diagnostics related to required fields of a MADR.
 * @param indices An object with the line number of each required field of a MADR (-1 if not present)
 * @param lines A string array of the document's text lines
 * @returns An array of diagnostics related to required fields of a MADR
 */
function getRequiredFieldsDiagnostics(
	indices: {
		title: number;
		contextAndProblemStatement: number;
		consideredOptions: number;
		decisionOutcome: number;
	},
	lines: string[]
): vscode.Diagnostic[] {
	const requiredFieldsDiagnostics = new Array<vscode.Diagnostic>();

	// check presence of required fields
	if (indices.title === -1) {
		requiredFieldsDiagnostics.push(allDiagnostics.title.missing(0, 0, 0, 1));
	}
	if (indices.contextAndProblemStatement === -1) {
		requiredFieldsDiagnostics.push(allDiagnostics.contextAndProblemStatement.missing(0, 0, 0, 1));
	}
	if (indices.consideredOptions === -1) {
		requiredFieldsDiagnostics.push(allDiagnostics.consideredOptions.missing(0, 0, 0, 1));
	}
	if (indices.decisionOutcome === -1) {
		requiredFieldsDiagnostics.push(allDiagnostics.decisionOutcome.missing(0, 0, 0, 1));
	}

	// check if present required fields are empty
	Object.entries(indices).forEach(([key, value]) => {
		if (value !== -1) {
			// also check if a section is the last section of the ADR (i.e., there is no (sub)header line after it)
			const headerIndex = getIndexOfFirstHeaderLine(lines.slice(value + 1));
			const indexOfNextHeaderLine = value + (headerIndex !== -1 ? headerIndex : lines.length - 1) + 1;

			// if section is empty
			if (
				!lines
					.slice(value + 1, indexOfNextHeaderLine)
					.join("\n")
					.replace(/\s/g, "")
			) {
				const diagnosticKey = key as keyof typeof indices;
				if (diagnosticKey !== "title") {
					requiredFieldsDiagnostics.push(
						allDiagnostics[diagnosticKey].empty(
							value + 1,
							0,
							indexOfNextHeaderLine,
							lines[indexOfNextHeaderLine - 1].length
						)
					);
				}
			}
		}
	});

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

/**
 * Returns the index of the first header or subheader line in an array (i.e., a line that starts with the '#' symbol)
 * of strings that represent the text lines of a text document. Returns -1 if there is no line that starts with '#'.
 * @param lines A string array of text lines
 */
function getIndexOfFirstHeaderLine(lines: string[]) {
	return lines.findIndex((line) => {
		return line.startsWith("#", 0);
	});
}
