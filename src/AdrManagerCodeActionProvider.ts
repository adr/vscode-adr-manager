import * as vscode from "vscode";
import { naturalCase2titleCase } from "./plugins/utils";

export class AdrManagerCodeActionProvider implements vscode.CodeActionProvider {
	provideCodeActions(
		document: vscode.TextDocument,
		range: vscode.Range | vscode.Selection,
		context: vscode.CodeActionContext,
		token: vscode.CancellationToken
	): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
		const actions = new Array<vscode.CodeAction | vscode.Command>();

		context.diagnostics.forEach((diagnostic) => {
			if (diagnostic.code === "madr-header-not-in-title-case") {
				actions.push(this.createTitleCaseCodeAction(document, diagnostic));
			}
		});

		return actions;
	}

	/**
	 * Returns a code action that replaces the non-title-case string specified in the diagnostic with its title-case
	 * equivalent.
	 * @param diagnostic The diagnostic for which the title case code action will be created
	 * @returns A CodeAction object that replaces the non-title-case string with its title case equivalent
	 */
	private createTitleCaseCodeAction(document: vscode.TextDocument, diagnostic: vscode.Diagnostic): vscode.CodeAction {
		const text = document.getText(diagnostic.range);
		const action = new vscode.CodeAction("Convert to title case", vscode.CodeActionKind.QuickFix);

		const edit = new vscode.WorkspaceEdit();
		edit.replace(document.uri, diagnostic.range, naturalCase2titleCase(text));

		action.diagnostics = [diagnostic];
		action.isPreferred = true;
		action.edit = edit;

		return action;
	}
}
