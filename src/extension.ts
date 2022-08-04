// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { cleanPathString } from "./plugins/utils";
import {
	isSingleRootWorkspace,
	isWorkspaceOpened,
	getWorkspaceFolders,
	initializeAdrDirectory,
	getAddEditorMode,
	getViewEditorMode,
	determineViewEditorMode,
	containsOnlyRootFolders,
	getAllChildRootFoldersAsStrings,
	treatAsMultiRoot,
} from "./extension-functions";
import { WebPanel } from "./WebPanel";
import { md2adr } from "./plugins/parser";

/**
 * Sets up the extension to be used in VS Code.
 * This function is automatically called when the extension is activated via an activation event specified in package.json.
 * @param context The context of the extension (automatically provided by the extension)
 */
export function activate(context: vscode.ExtensionContext) {
	// Open ADR Manager Main Webview
	vscode.commands.registerCommand("vscode-adr-manager.openMainWebView", () => {
		WebPanel.createOrShow(context.extensionUri, "main");
	});

	// Open ADR Manager Add ADR Webview
	vscode.commands.registerCommand("vscode-adr-manager.openAddAdrWebView", () => {
		if (getAddEditorMode() === "basic") {
			WebPanel.createOrShow(context.extensionUri, "add-basic");
		} else {
			WebPanel.createOrShow(context.extensionUri, "add-professional");
		}
	});

	// Open ADR Manager View Basic ADR Webview
	vscode.commands.registerCommand("vscode-adr-manager.openViewAdrWebView", async (mdString) => {
		if (getViewEditorMode() === "sufficient") {
			if ((await determineViewEditorMode(mdString)) === "basic") {
				WebPanel.createOrShow(context.extensionUri, "view-basic");
			} else {
				WebPanel.createOrShow(context.extensionUri, "view-professional");
			}
		} else if (getViewEditorMode() === "basic") {
			WebPanel.createOrShow(context.extensionUri, "view-basic");
		} else {
			WebPanel.createOrShow(context.extensionUri, "view-professional");
		}
	});

	// Initialize ADR directory based on configuration
	vscode.commands.registerCommand("vscode-adr-manager.initializeAdrDirectory", async () => {
		if (!isWorkspaceOpened()) {
			vscode.window.showErrorMessage("Please open a workspace folder to initialize ADR directory");
		} else {
			if (isSingleRootWorkspace()) {
				// Check if single-root folder is root folder of other root folders
				if (treatAsMultiRoot() && (await containsOnlyRootFolders(getWorkspaceFolders()[0].uri))) {
					const childRootFolder = await vscode.window.showQuickPick(
						getAllChildRootFoldersAsStrings(getWorkspaceFolders()[0].uri),
						{ title: "Choose the folder to save the ADR to:" }
					);
					if (childRootFolder) {
						initializeAdrDirectory(vscode.Uri.joinPath(getWorkspaceFolders()[0].uri, childRootFolder));
					}
				} else {
					initializeAdrDirectory(getWorkspaceFolders()[0].uri);
				}
			} else {
				const folder = await vscode.window.showWorkspaceFolderPick();
				if (folder) {
					initializeAdrDirectory(folder.uri);
				}
			}
		}
	});

	// Change the ADR directory
	vscode.commands.registerCommand("vscode-adr-manager.changeAdrDirectory", async () => {
		const newDirectory = await vscode.window.showInputBox({
			prompt: "Specify the path of the ADR directory, relative to a root workspace folder.",
			placeHolder: "docs/decisions",
		});
		if (newDirectory !== undefined) {
			await vscode.workspace.getConfiguration("adrManager").update("adrDirectory", cleanPathString(newDirectory));
			vscode.window.showInformationMessage("ADR directory changed.");
		}
	});

	// Open ADR Manager on currently open Markdown file
	vscode.commands.registerCommand("vscode-adr-manager.viewInAdrManager", async () => {
		if (vscode.window.activeTextEditor) {
			const file = vscode.window.activeTextEditor.document;
			const adr = md2adr(file.getText());
			if (!adr.conforming) {
				vscode.window.showErrorMessage(
					"The requested Markdown file does not conform to MADR, please edit the file such that it conforms to MADR."
				);
			} else {
				WebPanel.createOrShow(context.extensionUri, "main");
				WebPanel.currentPanel?.viewAdr(file.getText());
			}
		}
	});
}
