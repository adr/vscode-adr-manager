import * as vscode from "vscode";

/**
 * A collection of predefined diagnostic objects where the ranges have yet to be defined when
 * adding them to a DiagnosticCollection.
 */
export const allDiagnostics = {
	headerNotInTitleCase: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
		return {
			severity: vscode.DiagnosticSeverity.Warning,
			message: "Header is not written in title case.",
			code: "madr-header-not-in-title-case",
			source: "ADR Manager",
			range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
		};
	},
	title: {
		missing: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
			return {
				severity: vscode.DiagnosticSeverity.Error,
				message: "ADR does not have a title header.",
				code: "madr-no-title-header",
				source: "ADR Manager",
				range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
			};
		},
	},
	contextAndProblemStatement: {
		missing: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
			return {
				severity: vscode.DiagnosticSeverity.Warning,
				message: "ADR does not have a '## Context and Problem Statement' subheader.",
				code: "madr-no-context-and-problem-statement-subheader",
				source: "ADR Manager",
				range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
			};
		},
		empty: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
			return {
				severity: vscode.DiagnosticSeverity.Warning,
				message: "The section 'Context and Problem Statement' is empty.",
				code: "madr-no-context-and-problem-statement-value",
				source: "ADR Manager",
				range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
			};
		},
	},
	consideredOptions: {
		missing: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
			return {
				severity: vscode.DiagnosticSeverity.Warning,
				message: "ADR does not have a '## Considered Options' subheader.",
				code: "madr-no-considered-options-subheader",
				source: "ADR Manager",
				range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
			};
		},
		empty: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
			return {
				severity: vscode.DiagnosticSeverity.Warning,
				message: "The section 'Considered Options' is empty.",
				code: "madr-no-considered-options-value",
				source: "ADR Manager",
				range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
			};
		},
	},
	decisionOutcome: {
		missing: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
			return {
				severity: vscode.DiagnosticSeverity.Warning,
				message: "ADR does not have a '## Decision Outcome' subheader.",
				code: "madr-no-decision-outcome-subheader",
				source: "ADR Manager",
				range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
			};
		},
		empty: (startLine: number, startCharacter: number, endLine: number, endCharacter: number) => {
			return {
				severity: vscode.DiagnosticSeverity.Warning,
				message: "The section 'Decision Outcome' is empty.",
				code: "madr-no-decision-outcome-value",
				source: "ADR Manager",
				range: new vscode.Range(startLine, startCharacter, endLine, endCharacter),
			};
		},
	},
};
