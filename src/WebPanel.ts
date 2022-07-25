import * as vscode from "vscode";
import { getNonce } from "./plugins/utils";
import { VSCODE_RESET_URI, VSCODE_STYLE_URI } from "./plugins/constants";
import {
	createShortAdr,
	determineViewEditorMode,
	getAddEditorMode,
	getAllMDs,
	getOptionStringsFromConsideredOptions,
	getViewEditorMode,
	saveShortAdr,
	watchMarkdownChanges,
} from "./extension-functions";
import { ArchitecturalDecisionRecord } from "./plugins/classes";
import { md2adr } from "./plugins/parser";

export class WebPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: WebPanel | undefined;

	public static readonly viewType = "ADR-Manager";

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	/**
	 * Creates or shows a panel that displays a webview with the specified view using a string key.
	 * @param extensionUri The URI of the context the extension is running in (provided by VS Code)
	 * @param page A string key for a specific web view page
	 */
	public static createOrShow(extensionUri: vscode.Uri, page: string) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it.
		if (WebPanel.currentPanel) {
			WebPanel.currentPanel._update(page);
			WebPanel.currentPanel._panel.reveal(column);
			return;
		}

		// Otherwise, create a new panel.
		const panel = vscode.window.createWebviewPanel(
			WebPanel.viewType,
			"ADR Manager",
			column || vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true,
			}
		);

		// listen for changes on Markdown files to dynamically update ADR list in webview
		watchForWorkspaceChanges(panel);
		panel.iconPath = vscode.Uri.joinPath(extensionUri, "src/assets/logo.svg");

		watchForConfigurationChanges(panel);

		WebPanel.currentPanel = new WebPanel(panel, extensionUri, page);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, page: string) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._update(page);

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview to the VS Code API, mainly used for page navigation
		this._panel.webview.onDidReceiveMessage(async (e) => {
			switch (e.command) {
				case "main":
					vscode.commands.executeCommand("vscode-adr-manager.openMainWebView");
					return;
				case "add":
					if (getAddEditorMode() === "basic") {
						vscode.commands.executeCommand("vscode-adr-manager.openAddBasicAdrWebView");
					} else {
						// execute command for adding Professional ADR
					}
					return;
				case "view": {
					const fileUri = vscode.Uri.parse(e.data.fullPath);
					const mdString = new TextDecoder().decode(await vscode.workspace.fs.readFile(fileUri));
					switch (getViewEditorMode()) {
						case "sufficient":
							if ((await determineViewEditorMode(mdString)) === "basic") {
								// execute command for viewing Basic ADR
								await this.viewBasicAdr(mdString);
							} else {
								// execute command for viewing Professional ADR
							}
							return;
						case "basic":
							// execute command for viewing Basic ADR
							await this.viewBasicAdr(mdString);
							return;
						case "professional":
							// execute command for viewing Professional ADR
							return;
					}
				}
				case "fetchAdrs":
					let allAdrs: {
						adr: ArchitecturalDecisionRecord;
						fullPath: string;
						relativePath: string;
						fileName: string;
					}[] = [];
					(await getAllMDs()).forEach((md) => {
						allAdrs.push({
							adr: md2adr(md.adr),
							fullPath: md.fullPath,
							relativePath: md.relativePath,
							fileName: md.fileName,
						});
					});
					this._panel.webview.postMessage({ command: "fetchAdrs", adrs: JSON.stringify(allAdrs) });
					return;
				case "requestDelete":
					const selection = await vscode.window.showWarningMessage(
						`Are you sure you want to delete the ADR "${e.data.title}"?`,
						"Yes",
						"Cancel"
					);
					if (selection === "Yes") {
						await vscode.workspace.fs.delete(vscode.Uri.parse(e.data.fullPath), { useTrash: true });
						vscode.window.showInformationMessage("ADR deleted successfully.");
					}
					return;
				case "addOptionBasic":
					const option = await vscode.window.showInputBox({ prompt: "Enter a concise name for the option:" });
					if (option) {
						this._panel.webview.postMessage({ command: "addOptionBasic", option: option });
					}
					return;
				case "requestBasicOptionEdit":
					const newTitle = await vscode.window.showInputBox({
						prompt: "Enter a concise name for the option:",
						value: e.data.currentTitle,
					});
					if (newTitle) {
						this._panel.webview.postMessage({
							command: "requestBasicOptionEdit",
							newTitle: newTitle,
							index: e.data.index,
						});
					}
					return;
				case "createBasicAdr":
					createShortAdr(JSON.parse(e.data));
					return;
				case "saveBasicAdr":
					const uri = await saveShortAdr(JSON.parse(e.data).adr, JSON.parse(e.data).oldTitle);
					if (uri) {
						this._panel.webview.postMessage({ command: "saveSuccessful" });
						const open = await vscode.window.showInformationMessage(
							"ADR saved successfully. Do you want to open the Markdown file?",
							"Yes",
							"No"
						);
						if (open === "Yes") {
							vscode.window.showTextDocument(await vscode.workspace.openTextDocument(uri));
						}
					}
					return;
			}
		});
	}
	/**
	 * Opens the Basic MADR template and fills the fields with existing values of the specified ADR.
	 * @param mdString The Markdown ADR as a string
	 */
	async viewBasicAdr(mdString: string) {
		const adr = md2adr(mdString);
		await vscode.commands.executeCommand("vscode-adr-manager.openViewBasicAdrWebView");
		this._panel.webview.postMessage({
			command: "fetchAdrValues",
			adr: JSON.stringify({
				title: adr.title,
				contextAndProblemStatement: adr.contextAndProblemStatement,
				consideredOptions: adr.consideredOptions,
				chosenOption: adr.decisionOutcome.chosenOption,
				explanation: adr.decisionOutcome.explanation,
			}),
		});
	}

	/**
	 * This function is called upon closing the web panel, disposing the web panel in the process.
	 */
	public dispose() {
		WebPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	/**
	 * Renders the specified view in the webview using a string key.
	 * @param page A string key for a specific web view page
	 */
	private _update(page: string) {
		const webview = this._panel.webview;
		this._updatePanelTitle(page);
		this._panel.webview.html = this._getHtmlForWebview(webview, page);
	}

	/**
	 * Updates the title of the webview panel to match the specified view by using a string key
	 * @param page A string key for a specific web view page
	 */
	private _updatePanelTitle(page: string) {
		switch (page) {
			case "main":
				this._panel.title = "ADR Manager";
				return;
			case "add-basic" || "add-professional":
				this._panel.title = "ADR Manager - New ADR";
				return;
			case "view-basic" || "view-professional":
				this._panel.title = "ADR Manager - View ADR";
				return;
		}
	}

	/**
	 * Returns the HTML content that should be rendered by the specified webview.
	 * @param webview The webview that renders the HTML content
	 * @param page A string key for a specific web view page
	 * @returns The HTML content to be rendered by the webview as a string. Note that Vue mounts the div with the
	 * 			ID "app" depending on the specified web view page.
	 */
	private _getHtmlForWebview(webview: vscode.Webview, page: string) {
		// Get URIs to VS Code styling
		const VSCODE_STYLE_WEB_URI = webview.asWebviewUri(VSCODE_STYLE_URI);
		const VSCODE_RESET_WEB_URI = webview.asWebviewUri(VSCODE_RESET_URI);

		// Local path to main script run in the webview
		const SCRIPT_URI = vscode.Uri.joinPath(this._extensionUri, "dist/web", `${page}.js`);
		// URI to load the script in the webview
		const SCRIPT_WEB_URI = webview.asWebviewUri(SCRIPT_URI);

		// Local path to css styles
		const STYLE_URI = vscode.Uri.joinPath(this._extensionUri, "dist/web", `${page}.css`);
		// URI to load styles into webview
		const STYLE_WEB_URI = webview.asWebviewUri(STYLE_URI);

		// Codicons web URI
		const CODICONS_WEB_URI = webview.asWebviewUri(
			vscode.Uri.joinPath(this._extensionUri, "node_modules", "@vscode/codicons", "dist", "codicon.css")
		);

		// Use a NONCE to only allow specific scripts to be run
		const NONCE = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${VSCODE_RESET_WEB_URI}" rel="stylesheet">
				<link href="${VSCODE_STYLE_WEB_URI}" rel="stylesheet">
				<link href="${STYLE_WEB_URI}" rel="stylesheet">
				<link href="${CODICONS_WEB_URI}" rel="stylesheet">

			</head>
			<body>
				<div id="app"></div>
				<script NONCE="${NONCE}">
					const vscode = acquireVsCodeApi();
				</script>
				<script NONCE="${NONCE}" src="${SCRIPT_WEB_URI}"></script>
			</body>
			</html>`;
	}
}

/**
 * Sets up watchers to notify the webview to re-fetch ADRs upon changing a Markdown file in the workspace.
 * @param panel The webview panel to send the fetched ADRs to
 */
function watchForWorkspaceChanges(panel: vscode.WebviewPanel) {
	watchMarkdownChanges(panel);
	vscode.workspace.onDidChangeWorkspaceFolders(async (e) => {
		let allAdrs: { adr: ArchitecturalDecisionRecord; fullPath: string; relativePath: string; fileName: string }[] =
			[];
		(await getAllMDs()).forEach((md) => {
			allAdrs.push({
				adr: md2adr(md.adr),
				fullPath: md.fullPath,
				relativePath: md.relativePath,
				fileName: md.fileName,
			});
		});
		panel.webview.postMessage({ command: "fetchAdrs", adrs: allAdrs });
	});
}

/**
 * Sets up watchers to notify the webview to re-fetch ADRs upon changing configuration settings.
 * @param panel The webview panel to send the fetched ADRs to
 */
function watchForConfigurationChanges(panel: vscode.WebviewPanel) {
	vscode.workspace.onDidChangeConfiguration(async (e) => {
		if (e.affectsConfiguration("adrManager")) {
			let allAdrs: {
				adr: ArchitecturalDecisionRecord;
				fullPath: string;
				relativePath: string;
				fileName: string;
			}[] = [];
			(await getAllMDs()).forEach((md) => {
				allAdrs.push({
					adr: md2adr(md.adr),
					fullPath: md.fullPath,
					relativePath: md.relativePath,
					fileName: md.fileName,
				});
			});
			panel.webview.postMessage({ command: "fetchAdrs", adrs: allAdrs });
		}
	});
}
