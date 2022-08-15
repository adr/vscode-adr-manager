import * as vscode from "vscode";
import { cleanPathString, getNonce } from "./plugins/utils";
import {
	containsOnlyRootFolders,
	createBasicAdr,
	createProfessionalAdr,
	getAdrDirectoryString,
	getAdrNumberFromUri,
	getAllChildRootFoldersAsStrings,
	getAllMDs,
	getWorkspaceFolderNames,
	getWorkspaceFolders,
	isSingleRootWorkspace,
	saveAdr,
	treatAsMultiRoot,
} from "./extension-functions";
import { ArchitecturalDecisionRecord } from "./plugins/classes";
import { md2adr } from "./plugins/parser";

export class WebPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: WebPanel | undefined;

	public static readonly viewType = "ADR Manager";

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

		WebPanel.currentPanel = new WebPanel(panel, extensionUri, page);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, page: string) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		// Set the webview's initial html content
		this._update(page);

		// Set the panel icon
		this._panel.iconPath = vscode.Uri.joinPath(extensionUri, "assets/logo.png");

		// listen for changes on Markdown files to dynamically update ADR list in webview
		this.watchForWorkspaceChanges();

		// listen for configuration changes of the extension
		this.watchForConfigurationChanges();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programmatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview to the VS Code API, mainly used for page navigation
		this._panel.webview.onDidReceiveMessage(
			async (e) => {
				switch (e.command) {
					case "main": {
						vscode.commands.executeCommand("vscode-adr-manager.openMainWebView");
						return;
					}
					case "add": {
						vscode.commands.executeCommand("vscode-adr-manager.openAddAdrWebView");
						return;
					}
					case "view": {
						const fileUri = vscode.Uri.parse(e.data.fullPath);
						await this.viewAdr(fileUri);
					}
					case "fetchAdrs": {
						const allAdrs: {
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
					}
					case "getWorkspaceFolders": {
						this.sendWorkspaceFolders();
						return;
					}
					case "requestEdit": {
						const fileUri = vscode.Uri.parse(e.data.fullPath);
						vscode.window.showTextDocument(await vscode.workspace.openTextDocument(fileUri));
						return;
					}
					case "requestDelete": {
						const selection = await vscode.window.showWarningMessage(
							`Are you sure you want to delete the ADR "${e.data.title}"?`,
							"Yes",
							"Cancel"
						);
						if (selection === "Yes") {
							await vscode.workspace.fs.delete(vscode.Uri.parse(e.data.fullPath), { useTrash: true });
							vscode.window.showInformationMessage("ADR deleted.");
						}
						return;
					}
					case "addOption": {
						const option = await vscode.window.showInputBox({
							prompt: "Enter a concise name for the option:",
						});
						if (option) {
							this._panel.webview.postMessage({ command: "addOption", option: option });
						}
						return;
					}
					case "requestBasicOptionEdit": {
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
					}
					case "createBasicAdr": {
						createBasicAdr(JSON.parse(e.data));
						return;
					}
					case "createProfessionalAdr": {
						createProfessionalAdr(JSON.parse(e.data));
						return;
					}
					case "saveAdr": {
						const uri = await saveAdr(JSON.parse(e.data).adr);
						if (uri) {
							this._panel.webview.postMessage({ command: "saveSuccessful", newPath: uri.toString() });
							const open = await vscode.window.showInformationMessage(
								"ADR saved. Do you want to open the Markdown file?",
								"Yes",
								"No"
							);
							if (open === "Yes") {
								vscode.window.showTextDocument(await vscode.workspace.openTextDocument(uri));
							}
						}
						return;
					}
					case "switchAddViewBasicToProfessional": {
						vscode.commands.executeCommand("vscode-adr-manager.openAddAdrWebView", "add-professional");
						this._panel.webview.postMessage({ command: "fetchAdrValues", adr: e.data });
						return;
					}
					case "switchAddViewProfessionalToBasic": {
						vscode.commands.executeCommand("vscode-adr-manager.openAddAdrWebView", "add-basic");
						this._panel.webview.postMessage({ command: "fetchAdrValues", adr: e.data });
						return;
					}
					case "switchViewingViewBasicToProfessional": {
						// mdString argument not needed since the editor mode is specified
						vscode.commands.executeCommand(
							"vscode-adr-manager.openViewAdrWebView",
							"",
							"view-professional"
						);
						this._panel.webview.postMessage({ command: "fetchAdrValues", adr: e.data });

						return;
					}
					case "switchViewingViewProfessionalToBasic": {
						// mdString argument not needed since the editor mode is specified
						vscode.commands.executeCommand("vscode-adr-manager.openViewAdrWebView", "", "view-basic");
						this._panel.webview.postMessage({ command: "fetchAdrValues", adr: e.data });
						return;
					}
				}
			},
			null,
			this._disposables
		);
	}
	/**
	 * Opens the Basic MADR template and fills the fields with existing values of the specified ADR.
	 * @param fileUri The URI of the ADR file to be viewed
	 */
	async viewAdr(fileUri: vscode.Uri) {
		const mdString = new TextDecoder().decode(await vscode.workspace.fs.readFile(fileUri));

		const adr = md2adr(mdString);
		await vscode.commands.executeCommand("vscode-adr-manager.openViewAdrWebView", mdString);

		const adrNumber = await getAdrNumberFromUri(fileUri);
		// "view-basic" or "view-professional" as page argument doesn't matter here
		this._updatePanelTitle("view-basic", adrNumber);

		this._panel.webview.postMessage({
			command: "fetchAdrValues",
			adr: JSON.stringify({
				yaml: adr.yaml,
				title: adr.title,
				date: adr.date,
				status: adr.status,
				deciders: adr.deciders,
				technicalStory: adr.technicalStory,
				contextAndProblemStatement: adr.contextAndProblemStatement,
				decisionDrivers: adr.decisionDrivers,
				consideredOptions: adr.consideredOptions,
				decisionOutcome: adr.decisionOutcome,
				links: adr.links,
				fullPath: fileUri.toString(),
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
	 * Updates the title of the webview panel to match the specified view by using a string key.
	 * @param page A string key for a specific web view page
	 */
	private _updatePanelTitle(page: string, adrNumber?: string) {
		switch (page) {
			case "main": {
				if (this._panel.title !== "ADR Manager") {
					this._panel.title = "ADR Manager";
				}
				return;
			}
			case "add-basic":
			case "add-professional": {
				if (this._panel.title !== "ADR Manager - Add ADR") {
					this._panel.title = "ADR Manager - Add ADR";
				}
				return;
			}
			case "view-basic":
			case "view-professional": {
				if (adrNumber) {
					if (!this._panel.title.startsWith("ADR Manager - View ADR", 0)) {
						this._panel.title = `ADR Manager - View ADR ${"#" + adrNumber}`;
					} else {
						this._panel.title = "ADR Manager - View ADR";
					}
				}
				return;
			}
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

	/**
	 * Sends the current workspace folder names to the webview.
	 */
	private async sendWorkspaceFolders() {
		let workspaceFolders = [] as string[];
		if (
			isSingleRootWorkspace() &&
			treatAsMultiRoot() &&
			(await containsOnlyRootFolders(getWorkspaceFolders()[0].uri))
		) {
			workspaceFolders = await getAllChildRootFoldersAsStrings(getWorkspaceFolders()[0].uri);
		} else {
			workspaceFolders = getWorkspaceFolderNames();
		}
		this._panel.webview.postMessage({
			command: "getWorkspaceFolders",
			workspaceFolders: JSON.stringify(workspaceFolders),
		});
	}

	/**
	 * Sets up watchers to notify the webview to re-fetch ADRs upon changing a Markdown file in the workspace.
	 */
	private watchForWorkspaceChanges() {
		this.watchMarkdownChanges();
		vscode.workspace.onDidChangeWorkspaceFolders(
			async (e) => {
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
				this._panel.webview.postMessage({ command: "fetchAdrs", adrs: allAdrs });
				this.sendWorkspaceFolders();
			},
			null,
			this._disposables
		);
	}

	/**
	 * Sets up a watcher that notifies the specified webview panel to update the ADR list
	 * every time a change occurs in the workspace regarding Markdown files.
	 */
	private watchMarkdownChanges() {
		// Listen for file changes
		const watcher = vscode.workspace.createFileSystemWatcher(`**/${cleanPathString(getAdrDirectoryString())}/*.md`);
		watcher.onDidCreate(
			async (e) => {
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
			},
			null,
			this._disposables
		);
		watcher.onDidChange(
			async (e) => {
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
			},
			null,
			this._disposables
		);
		watcher.onDidDelete(
			async (e) => {
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
			},
			null,
			this._disposables
		);
	}

	/**
	 * Sets up watchers to notify the webview to re-fetch ADRs upon changing configuration settings.
	 */
	private watchForConfigurationChanges() {
		vscode.workspace.onDidChangeConfiguration(
			async (e) => {
				if (e.affectsConfiguration("adrManager.adrDirectory")) {
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
					this.sendWorkspaceFolders();
				}
			},
			null,
			this._disposables
		);
	}
}
