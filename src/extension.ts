// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { WebPanel } from "./WebPanel";

/**
 * Sets up the extension to be used in VS Code.
 * This function is automatically called when the extension is activated via an activation event specified in package.json.
 * @param context The context of the extension (automatically provided by the extension)
 */
export function activate(context: vscode.ExtensionContext) {
	// Register Home View
	vscode.commands.registerCommand("vscode-adr-manager.showHome", () => {
		WebPanel.createOrShow(context.extensionUri, "home");
	});

	// Register About View
	vscode.commands.registerCommand("vscode-adr-manager.showAbout", () => {
		WebPanel.createOrShow(context.extensionUri, "about");
	});
}
