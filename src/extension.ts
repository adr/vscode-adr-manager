// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
	adrDirectoryExists,
	adrDirectoryString,
	isSingleRootWorkspace,
	isWorkspaceOpened,
	getWorkspaceFolders,
	fillAdrDirectory,
	initializeAdrDirectory,
} from "./plugins/vscode-utils";
import { WebPanel } from "./WebPanel";

/**
 * Sets up the extension to be used in VS Code.
 * This function is automatically called when the extension is activated via an activation event specified in package.json.
 * @param context The context of the extension (automatically provided by the extension)
 */
export function activate(context: vscode.ExtensionContext) {
	// Open ADR Manager Main Webview
	vscode.commands.registerCommand("vscode-adr-manager.openMainWebView", () => {
		WebPanel.createOrShow(context.extensionUri, "home");
	});

	// Initialize ADR directory based on configuration
	vscode.commands.registerCommand("vscode-adr-manager.initializeAdrDirectory", async () => {
		if (!isWorkspaceOpened()) {
			vscode.window.showErrorMessage("Please open a workspace folder to initialize ADR directory");
		} else {
			if (isSingleRootWorkspace()) {
				initializeAdrDirectory(getWorkspaceFolders()[0].uri);
			} else {
				const folder = await vscode.window.showWorkspaceFolderPick();
				if (folder) {
					initializeAdrDirectory(folder.uri);
				}
			}
		}
	});
}
