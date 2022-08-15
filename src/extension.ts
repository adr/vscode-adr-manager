// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { cleanPathString, matchesMadrTitleFormat } from "./plugins/utils";
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
	getAllMDs,
	getAdrDirectoryString,
} from "./extension-functions";
import { WebPanel } from "./WebPanel";
import { md2adr } from "./plugins/parser";
import { getDiagnostics } from "./diagnostics";
import { AdrManagerCodeActionProvider } from "./AdrManagerCodeActionProvider";

/**
 * Sets up the extension to be used in VS Code.
 * This function is automatically called when the extension is activated via an activation event specified in package.json.
 * @param context The context of the extension (automatically provided by the extension)
 */
export function activate(context: vscode.ExtensionContext) {
	// Add custom when clause context for ADR Directory
	updateWhenClauseContexts();

	// Create diagnostics for ADR files
	createAdrDiagnostics(context);

	// Open ADR Manager Main Webview
	context.subscriptions.push(
		vscode.commands.registerCommand("vscode-adr-manager.openMainWebView", () => {
			WebPanel.createOrShow(context.extensionUri, "main");
		})
	);

	// Open ADR Manager Add ADR Webview
	context.subscriptions.push(
		vscode.commands.registerCommand("vscode-adr-manager.openAddAdrWebView", (page?: string) => {
			if (!page) {
				if (getAddEditorMode() === "basic") {
					WebPanel.createOrShow(context.extensionUri, "add-basic");
				} else {
					WebPanel.createOrShow(context.extensionUri, "add-professional");
				}
			} else {
				WebPanel.createOrShow(context.extensionUri, page);
			}
		})
	);

	// Open ADR Manager View ADR Webview
	context.subscriptions.push(
		vscode.commands.registerCommand(
			"vscode-adr-manager.openViewAdrWebView",
			async (mdString: string, page?: string) => {
				if (!page) {
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
				} else {
					WebPanel.createOrShow(context.extensionUri, page);
				}
			}
		)
	);

	// Initialize ADR Directory based on configuration
	context.subscriptions.push(
		vscode.commands.registerCommand("vscode-adr-manager.initializeAdrDirectory", async () => {
			if (!isWorkspaceOpened()) {
				vscode.window.showErrorMessage("Please open a workspace folder to initialize ADR Directory");
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
		})
	);

	// Change the ADR Directory
	context.subscriptions.push(
		vscode.commands.registerCommand("vscode-adr-manager.changeAdrDirectory", async () => {
			const newDirectory = await vscode.window.showInputBox({
				prompt: "Specify the path of the ADR Directory, relative to a root workspace folder.",
				value: cleanPathString(getAdrDirectoryString()),
				placeHolder: "docs/decisions",
			});
			if (newDirectory) {
				if (cleanPathString(newDirectory).match(/^([^?*:\"<>|]+[\\/]?)+$/)) {
					await vscode.workspace
						.getConfiguration("adrManager")
						.update("adrDirectory", cleanPathString(newDirectory));
					vscode.window.showInformationMessage("ADR Directory changed.");
				} else {
					vscode.window.showErrorMessage(
						'Invalid directory. Avoid using the following characters: ? * : " < > |'
					);
				}
			}
		})
	);

	// Open ADR Manager on currently open Markdown file
	context.subscriptions.push(
		vscode.commands.registerCommand("vscode-adr-manager.viewInAdrManager", async () => {
			if (vscode.window.activeTextEditor) {
				const file = vscode.window.activeTextEditor.document;
				const adr = md2adr(file.getText());
				if (!adr.conforming) {
					vscode.window.showErrorMessage(
						"The requested Markdown file does not conform to MADR, please edit the file such that it conforms to MADR."
					);
				} else {
					if (!WebPanel.currentPanel) {
						WebPanel.createOrShow(context.extensionUri, "main");
					}
					WebPanel.currentPanel!.viewAdr(file.uri);
					if (
						!(await getAllMDs()).some((md) => {
							return md.adr === file.getText();
						})
					) {
						vscode.window.showWarningMessage("This ADR is not inside of the ADR Directory.");
					}
				}
			}
		})
	);

	// Open ADR Manager on Markdown file from context menu
	context.subscriptions.push(
		vscode.commands.registerCommand("vscode-adr-manager.viewAdrFromContextMenu", async (uri: vscode.Uri) => {
			const mdString = new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
			if (!WebPanel.currentPanel) {
				WebPanel.createOrShow(context.extensionUri, "main");
			}
			WebPanel.currentPanel!.viewAdr(uri);
			if (
				!(await getAllMDs()).some((md) => {
					return md.adr === mdString;
				})
			) {
				vscode.window.showWarningMessage("This ADR is not inside of the ADR Directory.");
			}
		})
	);

	// Update ADR Directory when clause context when user changes ADR
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration((e) => {
			if (e.affectsConfiguration("adrManager.adrDirectory")) {
				updateWhenClauseContexts();
			}
		})
	);
}

/**
 * Creates a collection of MADR-related diagnostics and sets it upon opening or
 * changing a potential ADR file.
 */
async function createAdrDiagnostics(context: vscode.ExtensionContext) {
	const diagnosticCollection = vscode.languages.createDiagnosticCollection("adr-manager");
	const diagnosticsHandler = async (doc: vscode.TextDocument) => {
		const splitFilePath = cleanPathString(doc.fileName).split("/");
		// only add diagnostics to ADR files
		if (!matchesMadrTitleFormat(splitFilePath[splitFilePath.length - 1])) {
			return;
		}
		const diagnostics = await getDiagnostics(doc);
		diagnosticCollection.set(doc.uri, diagnostics);
	};
	const didOpen = vscode.workspace.onDidOpenTextDocument((doc) => diagnosticsHandler(doc));
	const didChange = vscode.workspace.onDidChangeTextDocument((e) => diagnosticsHandler(e.document));
	const codeActionProvider = vscode.languages.registerCodeActionsProvider(
		"markdown",
		new AdrManagerCodeActionProvider()
	);

	if (vscode.window.activeTextEditor) {
		await diagnosticsHandler(vscode.window.activeTextEditor.document);
	}
	context.subscriptions.push(diagnosticCollection, didOpen, didChange, codeActionProvider);
}

/**
 * Sets  custom when clause contexts for the extension.
 */
export function updateWhenClauseContexts() {
	// Add custom when clause context to show/hide commands in the command palette
	vscode.commands.executeCommand("setContext", "vscode-adr-manager.hideCommand", false);

	// Add custom when clause context for the current ADR Directory
	const contextKeys = [...cleanPathString(getAdrDirectoryString()).split("/")];
	vscode.commands.executeCommand("setContext", "vscode-adr-manager.adrDirectory", contextKeys);
}
