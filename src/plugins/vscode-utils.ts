// File with helpers specifically using the VS Code Extension API
import * as vscode from "vscode";
import { ArchitecturalDecisionRecord } from "./classes";
import { adrTemplatemarkdownContent, initialMarkdownContent, readmeMarkdownContent } from "./constants";
import { md2adr } from "./parser";
import { cleanPathString, matchesMadrTitleFormat } from "./utils";

/**
 * Returns the workspace folders opened in the current VS Code instance.
 * @returns The current workspace folders of the VS Code instance, or an empty WorkspaceFolder array if there is no folder open
 */
export function getWorkspaceFolders(): readonly vscode.WorkspaceFolder[] {
	if (isWorkspaceOpened()) {
		return vscode.workspace.workspaceFolders!;
	}
	return [];
}

/**
 * Returns the string of the ADR directory specified by the user in the user/workspace settings
 * @returns The ADR directory specified by the user
 */
function getAdrDirectoryString(): string {
	return vscode.workspace.getConfiguration("adrManager").get("adrDirectory")!;
}

/**
 * Returns true iff there is a folder opened in the current workspace of the VS Code instance.
 * @returns True iff a folder is opened in the current workspace of the VS Code instance
 */
export function isWorkspaceOpened(): boolean {
	return vscode.workspace.workspaceFolders !== undefined && vscode.workspace.workspaceFolders.length > 0;
}

/**
 * Returns true iff the current workspace is a single-root workspace, i.e. iff there is exactly one root folder opened in the current workspace.
 * @returns True iff there is exactly one root folder opened in the current workspace
 */
export function isSingleRootWorkspace(): boolean {
	return isWorkspaceOpened() && getWorkspaceFolders().length === 1;
}

/**
 * Returns true iff the specified folder only contains other folders, implying that the specified folder is
 * the root folder for many other root folders which may have ADR directories.
 * @param folderUri The URI of a folder
 * @returns True iff the folder only contains other folders, indicating that the specified folder is
 *			the root folder of multiple root folders
 */
export async function containsOnlyRootFolders(folderUri: vscode.Uri): Promise<boolean> {
	const directory = await vscode.workspace.fs.readDirectory(folderUri);
	for (const [name, type] of directory) {
		// skip ".DS_Store" files which may cause problems with macOS users
		if (type !== vscode.FileType.Directory && name !== ".DS_Store") {
			return false;
		}
	}
	return true;
}

/**
 * Returns an array of URIs of all the child root folders of the specified folder.
 * If the specified folder is not a folder of root folders (i.e. it has files other than folders inside of it),
 * then this returns an empty array.
 * @param rootFolderUri The URI of the highest-level root folder (containing all other child root folders)
 * @returns An array of URIs of all the child root folders within the highest-level root folder, or
 * 			an empty array if the specified folder does not only have othe folders inside of it
 */
export async function getAllChildRootFolders(rootFolderUri: vscode.Uri): Promise<vscode.Uri[]> {
	const childRootFolderUris: vscode.Uri[] = [];
	if (await containsOnlyRootFolders(rootFolderUri)) {
		const rootFolderDirectory = await vscode.workspace.fs.readDirectory(rootFolderUri);
		for (const [name, type] of rootFolderDirectory) {
			if (type === vscode.FileType.Directory) {
				childRootFolderUris.push(vscode.Uri.joinPath(rootFolderUri, name));
			}
		}
	}
	return childRootFolderUris;
}

/**
 * Initializes the ADR directory in the specified root folder.
 * Initialization includes the creation of the ADR directory, along with filling the directory with boilerplate Markdown files.
 * @param rootFolderUri The URI of the root folder where the ADR directory should be initialized
 */
export async function initializeAdrDirectory(rootFolderUri: vscode.Uri) {
	if (!(await adrDirectoryExists(rootFolderUri))) {
		const adrFolderUri = vscode.Uri.joinPath(rootFolderUri, getAdrDirectoryString());
		await vscode.workspace.fs.createDirectory(adrFolderUri);
		await fillAdrDirectory(adrFolderUri);
	} else {
		const selection = await vscode.window.showInformationMessage(
			"The ADR directory already exists. Do you want to fill the directory with boilerplate Markdown files?",
			"Yes",
			"Cancel"
		);
		if (selection === "Yes") {
			const adrFolderUri = vscode.Uri.joinPath(rootFolderUri, getAdrDirectoryString());
			await fillAdrDirectory(adrFolderUri);
		}
	}
}

/**
 * Returns true iff there exists the ADR directory in the given workspace folder in the current VS Code instance (default: docs/decisions).
 * @param folderUri The URI to the directory in the current workspace
 * @returns True iff there exists the ADR directory in the given workspace folder in the current VS Code instance
 *
 */
export async function adrDirectoryExists(folderUri: vscode.Uri) {
	if (isWorkspaceOpened()) {
		const subDirectories = cleanPathString(getAdrDirectoryString()).split("/");
		let currentUri = folderUri;
		let currentDirectoryFound = true;

		// Iterate through subdirectories
		for (let i = 0; i < subDirectories.length; i++) {
			if (currentDirectoryFound) {
				currentDirectoryFound = false;
				let currentDirectory = await vscode.workspace.fs.readDirectory(currentUri);
				for (const [name, type] of currentDirectory) {
					if (type === vscode.FileType.Directory && name === subDirectories[i]) {
						currentDirectoryFound = true;
						if (i === subDirectories.length - 1) {
							return true; // last subdirectory found
						} else {
							break; // check next subdirectory
						}
					}
				}
				currentUri = vscode.Uri.joinPath(currentUri, subDirectories[i]);
			} else {
				return false;
			}
		}
	}

	return false;
}

/**
 * Fills the specified directory with README, an ADR template and a sample ADR.
 * @param folderUri The URI of the directory to be filled
 */
export async function fillAdrDirectory(folderUri: vscode.Uri) {
	await createMarkdownFile(folderUri, "0000-use-markdown-architectural-decision-records.md", initialMarkdownContent);
	await createMarkdownFile(folderUri, "README.md", readmeMarkdownContent);
	await createMarkdownFile(folderUri, "adr-template.md", adrTemplatemarkdownContent);
}

/**
 * Creates a Markdown file in the specified URI with the specified name and content.
 * @param folderUri The URI of the folder in which the Markdown file should be created
 * @param name The name of the Markdown file
 * @param content The content of the Markdown file
 */
export async function createMarkdownFile(folderUri: vscode.Uri, name: string, content: string) {
	await vscode.workspace.fs.writeFile(vscode.Uri.joinPath(folderUri, name), new TextEncoder().encode(content));
}

/**
 * Returns an array of the folder names that are open in the current workspace.
 * @returns A string array of all folder names currently opened in the workspace
 */
export function getWorkspaceFolderNames(): string[] {
	let names: string[] = [];
	if (isWorkspaceOpened()) {
		getWorkspaceFolders().forEach((folder) => {
			names.push(folder.name);
		});
	}
	return names;
}

/**
 * Returns an array of potential MADRs in the form of Markdown strings that are located in the root folders of the current workspace.
 * @returns A Promise which resolves in a string array of all potential MADR strings in the whole workspace
 */
export async function getAllMDs(): Promise<
	{ adr: string; fullPath: string; relativePath: string; fileName: string }[]
> {
	let mds: { adr: string; fullPath: string; relativePath: string; fileName: string }[] = [];
	if (isWorkspaceOpened()) {
		const workspaceFolders = getWorkspaceFolders();
		// Check if single-root folder is root folder of other root folders
		if (isSingleRootWorkspace() && (await containsOnlyRootFolders(workspaceFolders[0].uri))) {
			const childRootFolderUris = await getAllChildRootFolders(workspaceFolders[0].uri);
			for (let i = 0; i < childRootFolderUris.length; i++) {
				if (await adrDirectoryExists(childRootFolderUris[i])) {
					mds = [
						...mds,
						...(await getMDsFromFolder(
							vscode.Uri.joinPath(childRootFolderUris[i], getAdrDirectoryString())
						)),
					];
				}
			}
		} else {
			for (let i = 0; i < workspaceFolders.length; i++) {
				if (await adrDirectoryExists(workspaceFolders[i].uri)) {
					mds = [
						...mds,
						...(await getMDsFromFolder(
							vscode.Uri.joinPath(workspaceFolders[i].uri, getAdrDirectoryString())
						)),
					];
				}
			}
		}
	}
	return mds;
}

/**
 * Returns an array of potential MADRs in the form of strings that are located in the specified folder.
 * @param folderUri The URI of the directory to be scanned for MADRs
 * @returns A Promise which resolves in a string array of potential MADRs
 */
export async function getMDsFromFolder(
	folderUri: vscode.Uri
): Promise<{ adr: string; fullPath: string; relativePath: string; fileName: string }[]> {
	let adrs: { adr: string; fullPath: string; relativePath: string; fileName: string }[] = [];
	const directory = await vscode.workspace.fs.readDirectory(folderUri);
	for (const [name, type] of directory) {
		if (type === vscode.FileType.File && matchesMadrTitleFormat(name)) {
			const content = await vscode.workspace.fs.readFile(vscode.Uri.joinPath(folderUri, name));
			adrs.push({
				adr: new TextDecoder().decode(content),
				fullPath: vscode.Uri.joinPath(folderUri, name).fsPath,
				relativePath: getAdrPathRelativeFromRootFolder(vscode.Uri.joinPath(folderUri, name)),
				fileName: name,
			});
		}
	}
	return adrs;
}

/**
 * Sets up a watcher that notifies the specified webview panel to update the ADR list
 * every time a change occurs in the workspace regarding Markdown files.
 * @param panel The webview panel that will be notified of changes on Markdown files
 */
export function watchMarkdownChanges(panel: vscode.WebviewPanel) {
	// Listen for file changes
	const watcher = vscode.workspace.createFileSystemWatcher("**/*.md");
	watcher.onDidCreate(async (e) => {
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
	watcher.onDidChange(async (e) => {
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
	watcher.onDidDelete(async (e) => {
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
 * Returns the path of a specified ADR relative to a specified root folder.
 * This function returns a correct path iff the specified ADR is located in the
 * specified root folder or in one of its subdirectories.
 *
 * @param adrUri The URI of the file contained in the rootFolder or in one of its subfolders
 * @returns The path of the file relative to the root folder as a string
 */
function getAdrPathRelativeFromRootFolder(adrUri: vscode.Uri): string {
	let filePath = adrUri.fsPath;
	for (const folder of getWorkspaceFolders()) {
		if (filePath.match(folder.uri.fsPath)) {
			return filePath.replace(folder.uri.fsPath.substring(0, folder.uri.fsPath.lastIndexOf("/") + 1), "");
		}
	}

	return filePath;
}
